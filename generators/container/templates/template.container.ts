import { GlobalState } from '@modules/root';
import { connect, Dispatch } from 'react-redux';
import { <%=upperCamelCaseNameComponent%>ComponentProps, <%=upperCamelCaseNameComponent%>Component } from '<%=componentImportPath%>';

export interface <%=upperCamelCaseName%>ContainerProps {
}

function mapStateToProps(state: GlobalState, ownProps: <%=upperCamelCaseName%>ContainerProps): <%=upperCamelCaseNameComponent%>ComponentProps {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch<GlobalState>, ownProps: <%=upperCamelCaseName%>ContainerProps): <%=upperCamelCaseNameComponent%>ComponentProps {
  return {};
}

export const <%=upperCamelCaseName%>Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(<%=upperCamelCaseNameComponent%>Component);

