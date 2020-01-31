// http://deimos.dgi.uanl.mx/cgi-bin/wspd_cgi.sh/econskdx01.htm
// http://deimos.dgi.uanl.mx/cgi-bin/wspd_cgi.sh/econkdx01.htm

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

const kdx = document.querySelector("#kdx")!;
const [titles, calif] = Array.from(kdx.querySelectorAll("table"));
const filas = Array.from(calif.querySelectorAll("tr"));
const materias = filas.slice(1);
const header = Array.from(filas[0].querySelectorAll("td,th")).map(text);

const ac = ["A", "AC", "CU"];

function text(el: Element): string {
  return el.textContent?.replace(/\s+/g, " ")?.trim() || "";
}

const opPattern = /\bopo\b/i;
/** Determina cual es la primera oportunidad */
const op = header.findIndex(h => opPattern.test(h));
/** Determina cual es la última oportunidad */
const maxOp = op + header.slice(op + 1).findIndex(h => !opPattern.test(h));

const scores = materias
  .map(m =>
    Array.from(m.querySelectorAll("td"))
      .slice(op, maxOp + 1)
      .map(text)
      .filter(c => c !== "")
      .map(c => {
        if (ac.includes(c)) return 100;
        return Number(c) || 0;
      })
  )
  // Ignorar materias sin scores, como de un kardex incompleto.
  .filter(s => s.length > 0);

const todasLasMaterias = scores.flat();
const countNormal = todasLasMaterias.length;
const sumNormal = todasLasMaterias.reduce((acc, v) => acc + v, 0);

const pasadas = todasLasMaterias.filter(v => v >= 70);
const count = pasadas.length;
const sum = pasadas.reduce((acc, v) => acc + v, 0);

const avg = (sum / count).toFixed(2);
const avgNormal = (sumNormal / countNormal).toFixed(2);

const titleRows = Array.from(titles.querySelectorAll("tr"));
const beforeNode = titleRows
  .reverse()
  .find(r => /Consulta de K[aá]rdex/gi.test(text(r)));

const promedioTitleEl = document.createElement("tr");
promedioTitleEl.innerHTML = `
  <td colspan="2" class="titulos" width="100%" style="font-family:Arial;font-size:small;font-weight:bold">
    &nbsp; Promedio
  </td>
`;
beforeNode?.parentElement?.insertBefore(promedioTitleEl, beforeNode);

const barraNegraEl = document.createElement("tr");
barraNegraEl.innerHTML = `
  <td colspan="2" bgcolor="#000000" align="center" width="100%" height="2px">
  </td>
`;
beforeNode?.parentElement?.insertBefore(barraNegraEl, beforeNode);

const promedioEl = document.createElement("tr");
promedioEl.innerHTML = `
  <td>
    <table>
      <tr style="font-family:Arial;font-size:small;font-weight:bold">
        <td valign="middle" bgcolor="#FFEA96" height="21" style="font-size:10px;white-space:nowrap;">
          Promedio General:
        </td>
        <td bgcolor="#eeefe7" width="100%">
          ${avg}
        </td>
      </tr>
    </table>
  </td>
  <td>
    <table>
      <tr style="font-family:Arial;font-size:small;font-weight:bold">
        <td valign="middle" bgcolor="#FFEA96" height="21" style="font-size:10px;white-space:nowrap;">
          Promedio Normal:
        </td>
        <td bgcolor="#eeefe7" width="100%">
          ${avgNormal}
        </td>
      </tr>
    </table>
  </td>
`;
beforeNode?.parentElement?.insertBefore(promedioEl, beforeNode);

kdx.querySelectorAll("#noof").forEach(el => el.remove());
