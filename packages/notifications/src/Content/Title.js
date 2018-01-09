import styled from 'styled-components';
import classNames from 'classnames';
import CalloutStyles from '@zendesk/garden-css-callouts';
import { retrieveTheme } from 'garden-react-theming';

const Title = styled.div.attrs({
  className: classNames(CalloutStyles['c-callout__title'])
})`
  ${props => retrieveTheme('callout.title', props)}
`;

/** @component */
export default Title;
