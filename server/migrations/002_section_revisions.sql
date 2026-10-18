alter table public.site_sections add column if not exists revision bigint not null default 1;

create or replace function public.bump_section_revision() returns trigger language plpgsql as $$
begin
  new.revision := old.revision + 1;
  return new;
end;
$$;
drop trigger if exists site_section_revision on public.site_sections;
create trigger site_section_revision before update on public.site_sections for each row execute function public.bump_section_revision();

-- Normalize legacy identities once and persist them; names/numbers are not identities.
create or replace function public.normalize_section_ids(value jsonb, location text) returns jsonb language plpgsql as $$
declare result jsonb; entry jsonb; item_key text; item_value jsonb; ordinal integer := 0; row_id text; used_ids text[] := '{}';
begin
  if jsonb_typeof(value) = 'array' then
    result := '[]'::jsonb;
    for entry in select * from jsonb_array_elements(value) loop
      entry := public.normalize_section_ids(entry, location || '/' || ordinal);
      if jsonb_typeof(entry) = 'object' then
        row_id := entry->>'id';
        if row_id is null or row_id = '' or row_id = any(used_ids) then
          row_id := 'legacy-' || md5(location || '/' || ordinal);
          entry := jsonb_set(entry, '{id}', to_jsonb(row_id));
        end if;
        used_ids := array_append(used_ids, row_id);
      end if;
      result := result || jsonb_build_array(entry);
      ordinal := ordinal + 1;
    end loop;
    return result;
  elsif jsonb_typeof(value) = 'object' then
    result := '{}'::jsonb;
    for item_key, item_value in select * from jsonb_each(value) loop
      if item_key not in ('updatedBy', 'lastModified', 'sectionKey') then
        result := result || jsonb_build_object(item_key, public.normalize_section_ids(item_value, location || '/' || item_key));
      end if;
    end loop;
    return result;
  end if;
  return value;
end;
$$;
update public.site_sections set data = public.normalize_section_ids(data,id) where data is distinct from public.normalize_section_ids(data,id);
drop function public.normalize_section_ids(jsonb,text);

