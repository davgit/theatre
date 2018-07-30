const sanifySlashedPath = (p: string): string =>
  p
    .replace(/^[\s\/]*/, '')
    .replace(/[\s\/]*$/, '')
    .replace(/\s*\/\s*/, ' / ')

const getValidationErrorsOfSlashedPath = (p: string): void | string => {
  if (typeof p !== 'string') return `it is not a string. (it is a ${typeof p})`

  const components = p.split(/\//)
  if (components.length === 0) return `it is empty.`

  for (let i = 0; i < components.length; i++) {
    const component = components[i].trim()
    if (component.length === 0) return `the component #${i + 1} is empty.`
  }
}

export function validateAndSanitiseSlashedPathOrThrow(
  unsanitisedPath: string,
  fnName: string,
) {
  const sanitisedPath = sanifySlashedPath(unsanitisedPath)
  const validation = getValidationErrorsOfSlashedPath(sanitisedPath)
  if (validation) {
    throw new Error(
      `The path in ${fnName}(${
        typeof unsanitisedPath === 'string' ? `"${unsanitisedPath}"` : ''
      }) is invalid because ${validation}`,
    )
  }
  if (unsanitisedPath !== sanitisedPath) {
    console.warn(
      // @todo better error message needed. What's the call to action?
      `The path in ${fnName}("${unsanitisedPath}") was sanitised to "${sanitisedPath}".`,
    )
  }
  return sanitisedPath
}
