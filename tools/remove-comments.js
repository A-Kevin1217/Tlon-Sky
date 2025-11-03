const fs = require('fs');
const path = require('path');

function isBinaryFile(filePath) {
  const binaryExtensions = new Set([
    '.png', '.jpg', '.jpeg', '.gif', '.webp', '.woff', '.woff2', '.ttf', '.eot', '.ico', '.pdf', '.mp3', '.mp4', '.zip'
  ]);
  const ext = path.extname(filePath).toLowerCase();
  return binaryExtensions.has(ext);
}

function stripHtmlComments(content) {
  
  return content.replace(/<!--([\s\S]*?)-->/g, '');
}

function stripYamlComments(content) {
  
  const lines = content.split(/\r?\n/);
  const out = lines.map((line) => {
    const trimmed = line.trimStart();
    if (trimmed.startsWith('#')) return '';
    let result = '';
    let inSingle = false;
    let inDouble = false;
    for (let i = 0; i < line.length; i += 1) {
      const ch = line[i];
      const prev = i > 0 ? line[i - 1] : '';
      if (ch === "'" && !inDouble && prev !== '\\') inSingle = !inSingle;
      else if (ch === '"' && !inSingle && prev !== '\\') inDouble = !inDouble;
      if (!inSingle && !inDouble && ch === '#') {
        break; 
      }
      result += ch;
    }
    return result;
  });
  return out.join('\n');
}

function stripJsCssComments(content) {
  
  const len = content.length;
  let i = 0;
  let out = '';
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let inRegex = false;
  let inBlock = false;
  let inLine = false;
  let templateStack = 0;

  function isRegexAllowedBefore(prevNonWsChar) {
    
    return (
      prevNonWsChar === '' ||
      '([,{;:?=!&|+\-*/%^~<>'.includes(prevNonWsChar)
    );
  }

  let prevNonWsChar = '';

  while (i < len) {
    const ch = content[i];
    const next = i + 1 < len ? content[i + 1] : '';

    if (inLine) {
      if (ch === '\n') {
        inLine = false;
        out += ch;
      }
      i += 1;
      continue;
    }

    if (inBlock) {
      if (ch === '*' && next === '/') {
        inBlock = false;
        i += 2;
      } else {
        i += 1;
      }
      continue;
    }

    if (inRegex) {
      if (ch === '\\') {
        
        out += ch;
        if (i + 1 < len) out += content[i + 1];
        i += 2;
        continue;
      }
      if (ch === '/') {
        inRegex = false;
      }
      out += ch;
      i += 1;
      continue;
    }

    if (inTemplate) {
      if (ch === '\\') {
        out += ch;
        if (i + 1 < len) out += content[i + 1];
        i += 2;
        continue;
      }
      if (ch === '`') {
        templateStack -= 1;
        if (templateStack <= 0) {
          inTemplate = false;
        }
        out += ch;
        i += 1;
        continue;
      }
      if (ch === '$' && next === '{') {
        
        out += '${';
        i += 2;
        let braceDepth = 1;
        while (i < len && braceDepth > 0) {
          const c = content[i];
          const n = i + 1 < len ? content[i + 1] : '';
          if (c === '/' && n === '*') {
            inBlock = true; i += 2; break;
          }
          if (c === '/' && n === '/') {
            inLine = true; i += 2; break;
          }
          if (c === '\'' || c === '"') {
            
            const quote = c; out += c; i += 1;
            while (i < len) {
              const cc = content[i];
              out += cc;
              if (cc === '\\') { if (i + 1 < len) { out += content[i + 1]; i += 1; } }
              else if (cc === quote) { i += 1; break; }
              i += 1;
            }
            continue;
          }
          if (c === '`') {
            
            inTemplate = true; templateStack += 1; out += c; i += 1; break;
          }
          if (c === '{') braceDepth += 1;
          else if (c === '}') braceDepth -= 1;
          out += c;
          i += 1;
        }
        continue;
      }
      out += ch;
      i += 1;
      continue;
    }

    if (inSingle) {
      out += ch;
      if (ch === '\\') {
        if (i + 1 < len) { out += content[i + 1]; i += 1; }
      } else if (ch === '\'') {
        inSingle = false;
      }
      i += 1;
      continue;
    }

    if (inDouble) {
      out += ch;
      if (ch === '\\') {
        if (i + 1 < len) { out += content[i + 1]; i += 1; }
      } else if (ch === '"') {
        inDouble = false;
      }
      i += 1;
      continue;
    }

    
    if (ch === '\'' ) { inSingle = true; out += ch; i += 1; continue; }
    if (ch === '"') { inDouble = true; out += ch; i += 1; continue; }
    if (ch === '`') { inTemplate = true; templateStack = 1; out += ch; i += 1; continue; }

    if (ch === '/' && next === '*') {
      inBlock = true; i += 2; continue;
    }
    if (ch === '/' && next === '/') {
      
      const before = prevNonWsChar;
      if (before !== ':' && before !== '/') {
        inLine = true; i += 2; continue;
      }
    }
    if (ch === '/') {
      
      if (isRegexAllowedBefore(prevNonWsChar)) {
        
        
        let j = i + 1; let escaped = false; let found = false;
        while (j < len) {
          const cj = content[j];
          if (!escaped && cj === '/') { found = true; break; }
          if (!escaped && cj === '\n') break;
          escaped = !escaped && cj === '\\';
          if (escaped) { escaped = false; j += 1; continue; }
          j += 1;
        }
        if (found) {
          inRegex = true; out += ch; i += 1; continue;
        }
      }
    }

    out += ch;
    if (!/\s/.test(ch)) prevNonWsChar = ch;
    i += 1;
  }

  return out;
}

function processFile(filePath) {
  if (isBinaryFile(filePath)) return;
  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch {
    return;
  }
  const ext = path.extname(filePath).toLowerCase();
  let stripped = content;
  if (ext === '.html' || ext === '.htm') {
    stripped = stripHtmlComments(content);
  } else if (ext === '.yaml' || ext === '.yml') {
    stripped = stripYamlComments(content);
  } else if (ext === '.js' || ext === '.css' || ext === '.less') {
    stripped = stripJsCssComments(content);
  } else {
    return; 
  }
  if (stripped !== content) {
    fs.writeFileSync(filePath, stripped, 'utf8');
  }
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.isFile()) {
      processFile(full);
    }
  }
}

if (require.main === module) {
  const root = process.cwd();
  walk(root);
  
}


