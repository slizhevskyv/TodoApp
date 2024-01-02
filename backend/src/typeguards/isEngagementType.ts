import { Engagement } from '../enums';

export default (type: any): type is Engagement => type in Engagement;
