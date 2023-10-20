import React from 'react';
import parse from 'html-react-parser';

export function parseRelatedAndSections(data) {
  try {
    const related =
      data.Result.Resources.Resource[0].RelatedItems.RelatedItem;
    const sections =
      data.Result.Resources.Resource[0].Sections.section;
    return [related, sections];
  } catch (e) {
    console.log('error pulling article');
  }
}

export function parseSection(section) {
  return (
    <div className='flex flex-col gap-4'>
      {section.Title ? <h3>{section.Title}</h3> : null}
      {section.Content ? parse(section.Content) : null}
    </div>
  );
}

export function parseRelated(related) {
  return (
    <li>
      { related.Title
        ? <a id={related.Id}>{related.Title}</a>
        : null }
    </li>
  );
}