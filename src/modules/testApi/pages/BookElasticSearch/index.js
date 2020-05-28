import { Defaults } from './pageConfig';
import { loadableBusiness } from '../../../../helpers/moduleHelper';

export default loadableBusiness(() => import('./business'), Defaults);
