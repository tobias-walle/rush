import { GlobalState } from '@modules/root';
import { connect, Dispatch } from 'react-redux';
import { <%=upperCamelCaseNameComponent%>Props, <%=upperCamelCaseNameComponent%> } from '<%=componentImportPath%>';

export interface <%=upperCamelCaseName%>ContainerProps {
}

function mapStateToProps(state: GlobalState, ownProps: <%=upperCamelCaseName%>ContainerProps): <%=upperCamelCaseNameComponent%>Props {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch<GlobalState>, ownProps: <%=upperCamelCaseName%>ContainerProps): <%=upperCamelCaseNameComponent%>tProps {
  return {};
}

export const <%=upperCamelCaseName%>Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(<%=upperCamelCaseNameComponent%>);

