import { UserData } from '../types';
import { DEFAULT_ICON } from '../../constants';

export type ConvertProps = {
  src: string;
  userData: UserData[];
};

const borderRadius = '3px';

const replaceToLink = (str: string) =>
  str.replace(
    /https?:\/\/[-_.!~*\\'()a-zA-Z0-9;\/?:@&=+$,%#]+/g,
    (match) => `<a href="${match}" target='_blank'>[URL]</a>`
  );

export const convert = ({ src, userData }: ConvertProps) => {
  let cursor = -1;
  const lines = src.split('\n').reduce<string[]>((ret, line) => {
    if (/.+[：]/.test(line)) {
      cursor++;
    }
    if (!ret[cursor]) {
      ret[cursor] = '';
    }
    ret[cursor] += `${line.trimLeft()}`;
    return ret;
  }, []);

  if (lines.length === 0) return '';

  const mapData = new Map();

  userData.forEach(({ name, id }) => {
    mapData.set(name, { name, id });
  });

  const html = `<table style="background-color:#fff;border-collapse:separate;border-spacing:8px 12px;"><tbody>${lines
    .map((line, index) => {
      const [name, selif] = line.split('：');
      const icon = mapData.get(name)?.id
        ? `/api/user/photo.do/-/user.png?id=${
            mapData.get(name)?.id
          }&size=SIZE_96_R&.png`
        : DEFAULT_ICON;
      return `<tr><td style="vertical-align:top;border:none;"><img src="${icon}" height="auto" width="40" style="border-radius:${borderRadius};max-width:none;"/></td><td style="border:none;vertical-align:top; width:100%;word-break: break-all;overflow-wrap: anywhere;word-wrap:anywhere;"><span>${name}</span><div style="background-color: #e0edff; border-radius:${borderRadius}; padding:4px;max-width:600px;">${replaceToLink(
        selif
      )}</div></td></tr>`;
    })
    .join('')}</tbody></table>`;
  return html;
};
