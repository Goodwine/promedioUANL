// ==UserScript==
// @description Calcula tu "Promedio General" (el de documentos oficiales), y tu "Promedio Normal" (contando las materias reprobadas).
// @grant none
// @icon https://raw.githubusercontent.com/Goodwine/promedioUANL/master/extension/img/48.png
// @match http://deimos.dgi.uanl.mx/cgi-bin/wspd_cgi.sh/econskdx*
// @match https://deimos.dgi.uanl.mx/cgi-bin/wspd_cgi.sh/econskdx*
// @name Promedio UANL
// @version 0.7357
// ==/UserScript==

//http://deimos.dgi.uanl.mx/cgi-bin/wspd_cgi.sh/econskdx01.htm

// The MIT License (MIT)

// Copyright (c) 2014 Goodwine

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

var kdx = $('#kdx')[0];
var titles = $('table', kdx)[0];
var calif = $('table', kdx)[1];
var subj = $('tr', calif);
var header = $('td', subj[0]);
var op = header.length;
var maxOp = header.length;

for (var i = 0; i < header.length; i++) {
    if (header[i].textContent.trim().toUpperCase() == 'MATERIA') {
        op = i + 1;
        break;
    }
}

for (i = op; i < header.length; i++) {
    if (header[i].textContent.toUpperCase().indexOf("OPO.")) {
        maxOp = i;
    }
}

var avg = 0;
var count = 0;
var fullAvg = 0;
var totCount = 0;
for (var i = 1; i < subj.length; i++) {
    var cells = $('td', subj[i]);
    var val = 0;
    var rowHasValues = false;
    for (var j = op; j < maxOp; j++) {
        var str = cells[j].textContent.trim();
        if (isNaN(parseInt(str, 10))) {
            if (str.length === 0) {
                continue;
            }
            val = str == "AC" ? 100 : 0;
        } else {
            val = parseInt(str, 10);
        }
	rowHasValues = true
        fullAvg += val;
        totCount++;
    }
    if (rowHasValues) {
        avg += val;
        count++;
    }
}
avg = (avg / count).toFixed(2);
fullAvg = (fullAvg / totCount).toFixed(2);

var titleRows = $('tr', titles);
var nodeAfter = null;
for (var i = 0; i < titleRows.length; i++) {
    if(/Consulta de K[aá]rdex/ig.test(titleRows[i].textContent)) {
        nodeAfter = titleRows[i];
    }
}

var row = $('<tr>');
row.html('<td colspan="2" class="titulos" width="100%" style="font-family:Arial;font-size:small;font-weight:bold">&nbsp; Promedio</td>');
row.insertBefore(nodeAfter);

row = $('<tr>');
row.html('<td colspan="2" bgcolor="#000000" align="center" width="100%"><img src="http://deimos.dgi.uanl.mx/uanlimg/ws/shim.gif" height="2"></td>');
row.insertBefore(nodeAfter);

row = $('<tr>');
row.html('<td><table><tr style="font-family:Arial;font-size:small;font-weight:bold"><td valign="middle" bgcolor="#FFEA96" height="21" style="font-size:10px;white-space:nowrap;">Promedio General: </td><td bgcolor="#eeefe7" width="100%">'
    + avg + '</td></tr></table></td><td><table><tr style="font-family:Arial;font-size:small;font-weight:bold"><td valign="middle" bgcolor="#FFEA96" height="21" style="font-size:10px;white-space:nowrap;">Promedio Normal: </td><td bgcolor="#eeefe7" width="100%">'
    + fullAvg + '</td></tr></table><td />');
row.insertBefore(nodeAfter);

$('#noof', kdx).remove();
