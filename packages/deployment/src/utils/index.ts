import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname, basename, extname } from 'path';
import { mkdirp, Mustache } from '@umijs/utils';

interface GenerateServerProps {
  outputPath: string;
  mock: boolean;
  proxy: boolean;
}
export const generateServer = (props: GenerateServerProps) => {
  const { outputPath } = props;
  const tpl = readFileSync(join(__dirname, '../../templates/app.tpl'), 'utf-8');
  const content = Mustache.render(tpl, {
    mock: true,
    proxy: true,
  });
  const absPath = join(outputPath!, '..', 'app.js');
  mkdirp.sync(dirname(absPath));
  writeFileSync(absPath, content, 'utf-8');
}
