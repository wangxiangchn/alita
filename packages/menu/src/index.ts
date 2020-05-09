import { IApi, utils } from 'umi';
import { join } from 'path';
import getLayoutContent from './utils/getLayoutContent';
import getModelContent from './utils/getModelContent';

const DIR_NAME = 'alita-menu';

export default (api: IApi) => {

  api.describe({
    key: 'runtimeMenu',
    config: {
      default: {},
      schema(joi) {
        return joi.boolean();
      },
      onChange: api.ConfigChangeType.regenerateTmpFiles,
    },
  });

  // 注册runtime配置
  api.addRuntimePluginKey(() => 'runtimeMenu');

  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: join(DIR_NAME, 'AlitaLayout.tsx'),
      content: getLayoutContent(utils.winPath(join(__dirname, './layout/index.js')), !!api.userConfig.keepalive),
    });
    api.writeTmpFile({
      path: RELATIVE_MODEL_PATH,
      content: getModelContent(),
    });
  });

  api.modifyRoutes(routes => [
    {
      path: '/',
      component: utils.winPath(join(api.paths.absTmpPath || '', DIR_NAME, 'AlitaLayout.tsx')),
      routes,
    },
  ]);

  api.addUmiExports(() => [
    {
      exportAll: true,
      source: `../${RELATIVE_MODEL}`,
    },
    {
      exportAll: true,
      source: '@alitajs/alita-layout',
    },
  ]);
};
