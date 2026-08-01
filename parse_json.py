import json
import re

with open('seduction.json', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the extra brace
content = content.replace('  },\n  "chapter_map":', '  ,\n  "chapter_map":')

try:
    data = json.loads(content)
except Exception as e:
    print("JSON parse error:", e)
    exit(1)

qf = data.get('quick_facts', {})
title = qf.get('title', 'Unknown Title')
author = qf.get('author', 'Unknown Author')
genre = qf.get('genre', '')
hook = qf.get('hook', '')
argument = data.get('core_argument', '')
chapters = data.get('chapter_map', [])

# Format chapters
chapters_js = []
for ch in chapters:
    t = ch.get('chapter_title_or_number', '').replace("'", "\\'")
    d = ch.get('summary', '').replace("'", "\\'")
    chapters_js.append(f"          {{t:'{t}', d:'{d}'}}")
chapters_str = ',\n'.join(chapters_js)

js_obj = f'''    {{
      id:'art-of-seduction', title:'{title}', author:'{author}', category:'Nonfiction · {genre}',
      hook:"{hook}", cover:'#83A78E',
      angles:{{
        argument:"{argument}",
        chapters:[
{chapters_str}
        ],
        quotes:[],
        uses:[],
        pushback:"Not available.",
        authorBg:"Not available."
      }}
    }}'''

with open('seduction_js.txt', 'w', encoding='utf-8') as f:
    f.write(js_obj)
print("Successfully generated seduction_js.txt")
