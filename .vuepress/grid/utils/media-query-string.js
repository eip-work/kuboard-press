import isUndefined from './is-undefined'

export default ({ approach, query }) => {
  const attr = { 'mobile-first': 'min-width', 'desktop-first': 'max-width' }[approach]
  const [firstValue, secondValue] = query.split(' ')

  if (isUndefined(secondValue)) {
    return `(${attr}: ${firstValue})`
  }

  return `(min-width: ${firstValue}) and (max-width: ${secondValue})`
}
