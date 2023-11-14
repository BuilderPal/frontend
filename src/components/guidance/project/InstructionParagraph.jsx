import React from 'react'

const InstructionParagraph = ({ paragraph }) => {
  const s = '<div class="downloads"><h3 class="sr-only">Attachments</h3><ul id="attachments" class="ible-files unstyled list-unstyled"><li class="file-info clearfix"><a class="thumb-wrapper" href="https://content.instructables.com/FPH/BCDJ/FR0ZHJXG/FPHBCDJFR0ZHJXG.pdf" download="Catapult template.pdf"><span class="file-thumb"><img class="tiny-img ls-is-cached lazyloaded" data-src="https://content.instructables.com/static/image/attachment-PDF.png" src="https://content.instructables.com/static/image/attachment-PDF.png" alt="download {{ file.name }}"><noscript><img class="tiny-img" src="https://content.instructables.com/static/image/attachment-PDF.png" alt="download {{ file.name }}"/></noscript></span><span class="title">Catapult template.pdf</span></a><div class="file-actions"><a href="https://content.instructables.com/FPH/BCDJ/FR0ZHJXG/FPHBCDJFR0ZHJXG.pdf" download="Catapult template.pdf" class="btn pull-right">Download</a></div></li></ul></div>'
  return (<div className='mt-2 text-lg'><div dangerouslySetInnerHTML={{ __html: s }}/></div>)
}

export default InstructionParagraph
