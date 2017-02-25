import React from 'react';
import AceEditor from 'react-ace';
import brace from 'brace'; // eslint-disable-line no-unused-vars
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/theme/tomorrow_night_eighties';
import 'brace/theme/tomorrow_night_blue';
import 'brace/theme/kuroir';
import 'brace/theme/katzenmilch';
import 'brace/theme/chrome';

export default ({ changeFn, theme, userCode, annotations }) => {
  return (
    <AceEditor
      mode='javascript'
      theme={theme}
      width='100%'
      height='100%'
      fontSize={16}
      tabSize={2}
      wrapEnabled
      value={userCode}
      onChange={changeFn}
      name='TREE_EDITOR'
      editorProps={{ $blockScrolling: true }}
      annotations={annotations}
      enableBasicAutocompletion
      enableLiveAutocompletion
      onLoad={
        editor => {
          editor.focus();
          const session = editor.getSession();
          session.setUseWrapMode(true);
        }
      }
    />
  );
};
