---
title: "ERS-1000 Networking (and API)"
date: 2024-02-26
tags: ["projects", "aibo"]
layout: layouts/post.njk
---


<p>Unlike previous models, the ERS-1000 is a cloud-connected device that continuously connects to the network (provided its network switch has set WiFi and/or LTE to enabled). While the dog is capable of functioning off-network, key features are locked behind its web API. In addition, an as-of-yet unexplained system lock occurs on some units that cannot connect to the internet or ping cellular. (Could it be that these are security protections against tampering gone awry?)</p>

<p>Therefore, it is pertinent to have some understanding of the ERS-1000 network structure and features prior to EOL. The following research implicates <i>only public information the AIBO API serves</i>.</p>

<h2>Networking nitty-gritties</h2>

<p>AIBO connects to a large quantity of servers.</p>

<p>The myaibo application in particular is concerned with four servers primarily, outside of CDNs:</p>
<ul>
  <li>"friend", which handles friended AIBOs and keeping track of interaction between those robots</li>
  <li>"feedish" (feed dish), which handles the online 'feeding AIBO' features</li>
  <li>"trinity", which handles "AIBO missions" sent from AIBO patrol</li>
  <li>"frontgate", which appears to handle most other aspects of AIBO's online features such as the dog's hospitalization and update status, EULA, registered persons, etc</li>
  <li>"image" for storing and serving the images taken by AIBO</li>
</ul>

<p>Beyond this, there are analytics servers, content delivery servers, Amazon IOT servers, compute clusters, Amazon cloudfront interfaces, and others, that handle live data from the robot and build out the user interfaces.</p>

<p>The general cycle of behavior on the web is vaguely as follows:</p>
<ol>
  <li>myaibo authorizes with the server</li>
  <li>the latest version of the EULA is retrieved, and its acceptance status is checked</li>
  <li>the user's settings are retrieved</li>
  <li>the user's robots and their data are retrieved</li>
  <li>the user's cloud subscription status is received</li>
  <li>the robot's hospitalization status is received</li>
  <li>the server takes logs</li>
  <li>robot function servers are queried</li>
  <li>device state and functionality is checked</li>
  <li>system status and settings are checked</li>
  <li>app announcements are checked</li>
  <li>aibo's photos are checked and downloaded</li>
  <li>aibo's brain is served</li>
  <li>timezones are checked</li>
  <li>a list of error codes is received</li>
</ol>

<h2>Information from AIBO (hontai)</h2>

<h3>AIBO's personality</h3>
<p>AIBO reports both static values representing its set "personality" and dynamic "mood" values that inform AIBO's current state.</p>

<p>The static personality values are:</p>
<ul>
  <li>extroversion</li>
  <li>conscientiousness</li>
  <li>openness</li>
  <li>neuroticism</li>
  <li>sportsMinded</li>
</ul>

<p>Along with these static values, the server reports a "type" and a "level". The known "levels" are "little" and "normal", presumably connected to their age. The types correspond to the listed personality delineations in the app.</p>

<p>                       <table>
                            <thead>
                              <tr>
                                <th>Listed Name<br></th>
                                <th>Internal Name</th>
                                <th>extro- version<br></th>
                                <th>conscientious- ness</th>
                                <th>openness</th>
                                <th>neuroticism</th>
                                <th>sportsMinded</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>shy</td>
                                <td>shy</td>
                                <td>0</td>
                                <td>1</td>
                                <td>0</td>
                                <td>0.2</td>
                                <td>0</td>
                              </tr>
                              <tr>
                                <td>curious</td>
                                <td>cute</td>
                                <td>0.6</td>
                                <td>0.5</td>
                                <td>0.6</td>
                                <td>1</td>
                                <td>0</td>
                              </tr>
                              <tr>
                                <td>clingy</td>
                                <td>easygoing</td>
                                <td>1</td>
                                <td>0.5</td>
                                <td>0<br></td>
                                <td>0</td>
                                <td>0.3</td>
                              </tr>
                            </tbody>
                            </table>
</p>

<p>Note that this is an incomplete list. The "curious" values listed are for an aibo in their "little" stage rather than adult stage. It is possible there is more variation. If you'd like to contribute to this research and have a cloud-connected ERS-1000, let me know.</p>

<p>The dynamic values are:</p>
<ul>
  <li>anticipation_surprise</li>
  <li>fear_anger</li>
  <li>joy_sadness</li>
  <li>trust_disgust</li>
</ul>

<p>These values scale and are probably 16 bit decimals.</p>

<h2>Error codes</h2>
<p>Refers to all "popup" style notifications that can appear in the app. They also include feature notifications.</p>

<p>Most are copies of themselves, but they have distinct serials. The existing prefixes are DEV, NET, MEC, SYS, APP, FUP, SEC, FOTA, LEARNING, TRAINING, TIPS.</p>

<ul>
  <li>DEV: General internal errors</li>
  <li>NET: Network errors</li>
  <li>MEC: Mechanical errors</li>
  <li>SYS: 'System' error. Standard "restart your aibo" error</li>
  <li>APP: App errors? Standard "restart your aibo" error</li>
  <li>FUP: Failed update errors</li>
  <li>SEC: Also a failed update error.</li>
  <li>FOTA: Firmware Over the Air. Prompts you to update AIBO.</li>
  <li>TRAINING: Notifies that the "be quiet" behaviors have changed or improved.</li>
  <li>TIPS: Notifies that your AIBO can get off of the station by itself after having charged.</li>
</ul>

<h2>Model numbers</h2>
<p>For an unknown reason, a full list of used and unused model numbers is reported.</p>

<p>                        <table>
                        <thead><tr><th title="Field #1">MODEL #</th>
                            <th title="Field #2">REGION</th>
                            </tr></thead>
                            <tbody><tr>
                            <td>ERS-1000/N2 J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-XXXX/Y J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-XXXX/Z J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-XXXX/Y U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-XXXX/A J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/A J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/B J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/C J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/D J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/E J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/F J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/G J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/H J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/I J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/J J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/K J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/L J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/M J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/N J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/O J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/P J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/Q J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/R J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/S J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/T J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/U J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/V J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/W J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/X J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/Y J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/Z J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/A U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/B U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/C U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/D U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/E U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/F U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/G U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/H U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/I U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/J U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/K U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/L U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/M U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/N U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/O U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/P U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/Q U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/R U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/S U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/T U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/U U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/V U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/W U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/X U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/Y U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>SR1-1000/Z U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/A J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/B J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/C J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/D J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/E J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/F J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/G J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/H J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/I J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/J J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/K J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/L J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/M J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/N J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/O J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/P J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/Q J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/R J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/S J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/T J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/U J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/V J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/W J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/X J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/Y J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/Z J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/BI2J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/WI2J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/W3 J1</td>
                            <td>&quot;JP&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/A U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/B U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/C U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/D U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/E U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/F U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/G U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/H U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/I U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/J U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/K U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/L U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/M U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/N U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/O U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/P U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/Q U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/R U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/S U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/T U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/U U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/V U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/W U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/X U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/Y U8</td>
                            <td>&quot;US&quot;</td>
                            </tr>
                            <tr>
                            <td>ERS-1000/Z</td>
                            <td> </td>
                            </tr>
                            </tbody></table>
</p>

<p>Not likely intended behavior-- but isn't this fascinating?</p>

<p>
    <h2>Bizarre discoveries and funny comeuppances</h2>
    <ul>
        <li>AIBO's virtual food items have a "weight", implying AIBO can gain weight. Realistically, this is probably how the server keeps track of when AIBO is 'full'.
        </li>
        <li>
        Early in the ERS-1000's lifespan, it was announced that Chinese and American releases would be targeted. While the American release materialized, the Chinese release did not. Remnants indicate that the myaibo applications <i>were</i> being developed for Mandarin prior to that aspect of the project's cancellation.
        </li>
        <li>AIBO uses connmann.</li>
    </ul>
</p>

<p class="disclaimer">the song recommendation is: sm43429658. written 02/26/2024</p>
