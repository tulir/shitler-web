#!/bin/bash
# shitler-web - A HTML5 client for shitlerd
# Copyright (C) 2016 Tulir Asokan

# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.

# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.

# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

htmlminify() {
    html-minifier --html-5 \
        --collapse-boolean-attributes \
        --collapse-inline-tag-whitespace \
        --collapse-whitespace \
        --remove-attribute-quotes \
        --remove-comments \
        --remove-redundant-attributes \
        --remove-script-type-attributes \
        --remove-style-link-type-attributes \
        --use-short-doctype
}

minifyappend() {
    echo -n '<script type="text/html" id="template-'$1'"> ' >> templates.min.html
    cat "templates/$1.html" | htmlminify >> templates.min.html
    echo -n "</script>" >> templates.min.html
}

touch templates.min.html
minifyappend join
minifyappend lobby
minifyappend cantconnect
minifyappend connecting

if [ ! -f index.max.html ]; then
    mv index.html index.max.html
fi

cat index-min.html | html-minifier --html-5 --collapse-boolean-attributes --collapse-inline-tag-whitespace --collapse-whitespace --remove-attribute-quotes --remove-redundant-attributes --remove-script-type-attributes --remove-style-link-type-attributes > index.html
