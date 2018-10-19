import resolveCss from '$shared/utils/resolveCss'
import UIComponent from '$tl/ui/handy/UIComponent'
import React from 'react'
import * as css from './EnsureProjectsDontHaveErrors.css'
import {Pointer} from '$shared/DataVerse2/pointer'
import {val} from '$shared/DataVerse2/atom'
import projectsSingleton from '$tl/Project/projectsSingleton'
import BrowserStateIsNotBasedOnDiskStateModal from '$tl/ui/UIRoot/BrowserStateIsNotBasedOnDiskStateModal'

interface IProps {
  css?: Partial<typeof css>
  children: React.ReactNode
}

interface IState {}

export default class EnsureProjectsDontHaveErrors extends UIComponent<
  IProps,
  IState
> {
  constructor(props: IProps, context: $IntentionalAny) {
    super(props, context)
    this.state = {}
  }

  _render(propsP: Pointer<IProps>, stateP: Pointer<IState>) {
    const internalProjects = val(projectsSingleton.atom.pointer.projects)
    const projectIds = Object.keys(internalProjects)
    for (const projectId of projectIds) {
      const internalProject = internalProjects[projectId]
      const loadingStateType = val(internalProject.atomP.ephemeral.loadingState.type)
      if (loadingStateType === 'browserStateIsNotBasedOnDiskState') {
        return <BrowserStateIsNotBasedOnDiskStateModal projectId={projectId} />
      }
    }

    const classes = resolveCss(css, this.props.css)

    return <div {...classes('container')}>{val(propsP.children)}</div>
  }
}
