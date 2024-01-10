export const initialStateFooter = {
  isSaving: false,
  info: {
    mainSection: {
      logo: '',
      logoTitle: '',
      moreInfo: [{name: '', description: ''}],
    },
    menus: [{title: '', links: [{name: '', outsideURL: false, url: ''}]}],
    socialMedia: [{name: '', icon: '', url: '', position: 0}],
    aditionalFooterInfo: [
      {name: '', outsideURL: false, url: '', disable: true},
    ],
    lastModified: '',
    sectionTitle: 'Footer',
    title: '',
    updatedBy: '',
  },
  active: false,
}
