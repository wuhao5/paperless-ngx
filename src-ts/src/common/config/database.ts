/**
 * Database connection configuration using TypeORM
 */

import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from '../../paperless/config/settings';

// Import entities
import { User } from '../../paperless/models/User';
import { Group } from '../../paperless/models/Group';
import { ApplicationConfiguration } from '../../paperless/models/ApplicationConfiguration';
import { Correspondent } from '../../documents/models/Correspondent';
import { DocumentType } from '../../documents/models/DocumentType';
import { Tag } from '../../documents/models/Tag';
import { StoragePath } from '../../documents/models/StoragePath';
import { Document } from '../../documents/models/Document';
import { Note } from '../../documents/models/Note';
import { SavedView } from '../../documents/models/SavedView';
import { ShareLink } from '../../documents/models/ShareLink';
import { ShareLinkBundle } from '../../documents/models/ShareLinkBundle';
import { PaperlessTask } from '../../documents/models/PaperlessTask';
import { UiSettings } from '../../documents/models/UiSettings';
import { CustomField } from '../../documents/models/CustomField';
import { Workflow } from '../../documents/models/Workflow';
import { WorkflowTrigger } from '../../documents/models/WorkflowTrigger';
import { WorkflowAction } from '../../documents/models/WorkflowAction';
import { MailAccount } from '../../paperless_mail/models/MailAccount';
import { MailRule } from '../../paperless_mail/models/MailRule';
import { ProcessedMail } from '../../paperless_mail/models/ProcessedMail';

const entities = [
  User,
  Group,
  ApplicationConfiguration,
  Correspondent,
  DocumentType,
  Tag,
  StoragePath,
  Document,
  Note,
  SavedView,
  ShareLink,
  ShareLinkBundle,
  PaperlessTask,
  UiSettings,
  CustomField,
  Workflow,
  WorkflowTrigger,
  WorkflowAction,
  MailAccount,
  MailRule,
  ProcessedMail,
];

const dataSourceOptions: DataSourceOptions = {
  type: config.database.type,
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  synchronize: config.environment === 'development',
  logging: config.debug,
  entities,
  migrations: ['./src/migrations/*.ts'],
  subscribers: [],
};

export const AppDataSource = new DataSource(dataSourceOptions);

export async function initializeDatabase(): Promise<DataSource> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
}

export default AppDataSource;
