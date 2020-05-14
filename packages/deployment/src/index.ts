import { IApi } from 'umi';
import { generateServer } from './utils';

export default (api: IApi) => {

  api.describe({
    key: 'deployment',
    config: {
      schema(joi) {
        return joi.object();
      },
    },
  });

  api.modifyDefaultConfig(memo => {
    return {
      ...memo,
      outputPath: 'dist/assect',
      history: { type: 'hash' },
    }
  });
  api.onBuildComplete(({ err }) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(api.paths.absOutputPath)
    generateServer({ outputPath: api.paths.absOutputPath! });
  })
}

