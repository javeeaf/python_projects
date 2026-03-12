import urllib.request
import json

URL = 'https://raw.githubusercontent.com/wafaaelmaandy/Hisn-Muslim-Json/master/husn_en.json'

def escape_js_string(s):
    if not s: return ""
    return s.replace('\\', '\\\\').replace('\"', '\\\"').replace('\'', '\\\'').replace('\n', '\\n').replace('\r', '')

def build():
    res = urllib.request.urlopen(URL).read()
    data = json.loads(res)
    chapters = data.get('English', [])
    
    categories_map = {}
    duas_map = {}
    
    for chapter in chapters:
        title = chapter.get('TITLE', 'General Duas').strip()
        cat_id = str(len(categories_map) + 1)
        categories_map[cat_id] = title
        duas_map[cat_id] = []
        
        # Determine a reasonable icon based on keywords in title
        title_lower = title.lower()
        
        for text_item in chapter.get('TEXT', []):
            arabic = text_item.get('ARABIC_TEXT', '').strip()
            transliteration = text_item.get('LANGUAGE_ARABIC_TRANSLATED_TEXT', '').strip()
            translation = text_item.get('TRANSLATED_TEXT', '').strip()
            dua_id = 'd' + str(text_item.get('ID', len(duas_map[cat_id]) + 1))
            
            # Use the first 50 chars of translation as a subtitle/title
            short_title = translation[:50] + ('...' if len(translation)>50 else '')
            # Strip parentheses from the beginning if present
            if short_title.startswith('('):
                short_title = short_title[1:].strip()
                if short_title.endswith('...'):
                    pass
                elif short_title.endswith(')'):
                    short_title = short_title[:-1]
            
            duas_map[cat_id].append({
                'id': dua_id,
                'title': short_title if short_title else title,
                'arabic': escape_js_string(arabic),
                'transliteration': escape_js_string(transliteration),
                'translation': escape_js_string(translation)
            })

    # Generate the JS file contents
    js_content = "export const categories = [\n"
    for cat_id, title in categories_map.items():
        title_esc = escape_js_string(title)
        
        icon = 'book'
        title_lower = title.lower()
        if 'morning' in title_lower or 'evening' in title_lower: icon = 'sun-o'
        elif 'sleep' in title_lower or 'waking' in title_lower or 'night' in title_lower: icon = 'moon-o'
        elif 'prayer' in title_lower or 'salah' in title_lower or 'mosque' in title_lower or 'adhan' in title_lower: icon = 'building'
        elif 'travel' in title_lower or 'journey' in title_lower or 'vehicle' in title_lower or 'riding' in title_lower: icon = 'plane'
        elif 'eat' in title_lower or 'drink' in title_lower or 'fast' in title_lower or 'food' in title_lower: icon = 'cutlery'
        elif 'home' in title_lower or 'house' in title_lower: icon = 'home'
        elif 'sick' in title_lower or 'ill' in title_lower or 'pain' in title_lower: icon = 'medkit'
        elif 'clothing' in title_lower or 'dress' in title_lower: icon = 'user'
        elif 'fear' in title_lower or 'distress' in title_lower or 'sorrow' in title_lower or 'worry' in title_lower: icon = 'heartbeat'
        elif 'prais' in title_lower or 'allah' in title_lower or 'prophet' in title_lower: icon = 'star'
        elif 'hajj' in title_lower or 'umrah' in title_lower or 'ihram' in title_lower or 'safa' in title_lower: icon = 'globe'
        elif 'debt' in title_lower or 'wealth' in title_lower: icon = 'money'
        elif 'rain' in title_lower or 'wind' in title_lower or 'thunder' in title_lower: icon = 'cloud'
        elif 'toilet' in title_lower or 'ablution' in title_lower: icon = 'tint'
        
        js_content += f"    {{ id: '{cat_id}', title: '{title_esc}', icon: '{icon}' }},\n"
    js_content += "];\n\n"

    js_content += "export const duas = {\n"
    for cat_id, duas_list in duas_map.items():
        if not duas_list: continue
        js_content += f"    '{cat_id}': [\n"
        for dua in duas_list:
            js_content += f"        {{\n"
            js_content += f"            id: '{dua['id']}',\n"
            js_content += f"            title: '{escape_js_string(dua['title'])}',\n"
            js_content += f"            arabic: '{dua['arabic']}',\n"
            js_content += f"            transliteration: '{dua['transliteration']}',\n"
            js_content += f"            translation: '{dua['translation']}'\n"
            js_content += f"        }},\n"
        js_content += f"    ],\n"
    js_content += "};\n"

    with open('src/data/duas.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
        
    print(f"Successfully wrote {len(categories_map)} categories and {sum(len(d) for d in duas_map.values())} duas.")

if __name__ == '__main__':
    build()
