import { IApi, IConfig } from '@umijs/types';

export default (api: IApi) => {

  const pcDefaultOptions = {

  } as IConfig;

  api.modifyDefaultConfig(memo => {
    return {
      ...memo,
      ...pcDefaultOptions,
    }
  });
};
