import { mountStandalone } from '@r01al/mfe-workforce-common-client/standalone';
import '@r01al/mfe-workforce-common-client/standalone.css';
import Header from './Header';

mountStandalone({
	component: Header,
	layout: 'header',
});
