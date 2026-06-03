---
title: "Fourier Analysis on the Crypton SUPER PACK"
date: 2024-08-30
tags: ["projects"]
layout: layouts/post.njk
---

<h2>Assertion</h2>
<p>Newly released products HATSUNE MIKU SP and MEGURINE LUKA SP use the same recorded source data at their highest recorded pitches.</p>

<h2>Data Description</h2>
<p>Fourier analysis and pitch detection algorithm SRH is used to estimate the fundamental frequency of both singing voices.</p>

<table>
  <thead>
    <tr><th colspan="2"><h3>tS a_4</h3></th></tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <center><img src="/assets/misc/miku_1.png" width="300" alt="Plot of Miku audio amplitude over time"></center><br>
        <center><img src="/assets/misc/miku_2.png" width="300" alt="Plot of Miku pitch estimation over time"></center>
      </td>
      <td>
        <center><img src="/assets/misc/luka_1.png" width="300" alt="Plot of Luka audio amplitude over time"></center><br>
        <center><img src="/assets/misc/luka_2.png" width="300" alt="Plot of Luka pitch estimation over time"></center>
      </td>
    </tr>
    <tr>
      <td><center>MIKU SP</center></td>
      <td><center>LUKA SP</center></td>
    </tr>
  </tbody>
</table>

<table>
  <thead>
    <tr><th colspan="2"><h3>M’ M_4</h3></th></tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <center><img src="/assets/misc/miku_3.png" width="300" alt="Plot of Miku audio amplitude over time"></center><br>
        <center><img src="/assets/misc/miku_4.png" width="300" alt="Plot of Miku pitch estimation over time"></center>
      </td>
      <td>
        <center><img src="/assets/misc/luka_3.png" width="300" alt="Plot of Luka audio amplitude over time"></center><br>
        <center><img src="/assets/misc/luka_4.png" width="300" alt="Plot of Luka pitch estimation over time"></center>
      </td>
    </tr>
    <tr>
      <td><center>MIKU SP</center></td>
      <td><center>LUKA SP</center></td>
    </tr>
  </tbody>
</table>

<h2>Analysis</h2>
<p>They are not the same.</p>
<p>Samples do not occur within the same pitch ranges and have visibly different amplitudes.</p>
<p>If LUKA SP were a pitched-down version of MIKU SP, we would see the same characterization of the pitch at the fundamental frequency over time, albeit in a different range. This means that if this were the case, the y-axis would be different, but the shape of the curve would be the same or similar. Because this is not the case, we can determine the samples to be separate recordings.</p>

<h2>Source Code (MATLAB)</h2>
<p><a href="https://gist.github.com/aptitudex/a19a984965185409b090a02d2be0dd04">GitHub Gist</a> (This is just a MATLAB example, but mirrored here nonetheless.)</p>

<p class="disclaimer">the song recommendation is: sm43708803. written on 2024/08/30</p>
