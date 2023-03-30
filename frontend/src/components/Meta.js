import { Helmet } from 'react-helmet'
import React from 'react'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}
Meta.defaultProps = {
  title: 'Sell & Buy Books ',
  description:
    'Buy the second hand Books at cheap price ',
  keyword: 'notes, Buy Used Books',
}
export default Meta
