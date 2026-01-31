/**
 * ShareLink Controller
 */

import { ShareLink } from '../models/ShareLink';
import { BaseController } from '../../common/controllers/BaseController';

export class ShareLinkController extends BaseController<ShareLink> {
  protected entityClass = ShareLink;
  protected entityName = 'ShareLink';
}

export default ShareLinkController;
