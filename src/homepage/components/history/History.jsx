import React from 'react'
import {ImageSection, TextSection} from './sections'
import './history.css'

export const History = ({historyInfo = {}, galleryInfo}) => <section id="historia" className="History editorial-section history-editorial">
  <TextSection textSectionInfo={historyInfo} />
  <ImageSection imageSectionInfo={historyInfo.imageSection || {}} galleryInfo={galleryInfo} />
</section>
