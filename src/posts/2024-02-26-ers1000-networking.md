---
title: "ERS-1000 Networking (and API)"
date: 2024-02-26
tags: ["projects"]
layout: layouts/post.njk
---


<p>Unlike previous models, the ERS-1000 is a cloud-connected device that continuously connects to the network (provided its network switch has set WiFi and/or LTE to enabled). While the dog is capable of functioning off-network, key features are locked behind its web API. In addition, an as-of-yet unexplained system lock occurs on some units that cannot connect to the internet or ping cellular. (Could it be that there are security protections against tampering?)</p>

<p>Therefore, it is pertinent to have some understanding of the ERS-1000 network structure and features prior to EOL. The following research implicates <i>only public information the AIBO API serves</i>.</p>

<h2>Networking nitty-gritties</h2>

<p>AIBO connects to a large quantity of servers.</p>

<p>The myaibo application in particular is concerned with four servers primarily, outside of CDNs:</p>
<ul>
  <li>"friend", which handles friended AIBOs and keeping track of interaction between those robots</li>
  <li>"feedish" (feed dish), which handles the online 'feeding AIBO' features</li>
  <li>"trinity" (matrix reference?), which handles "AIBO missions" sent from AIBO patrol</li>
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

<p>(Detailed personality value tables from the original research are preserved in the source HTML version of this page.)</p>

<p>Note that this is an incomplete list. The "curious" values listed are for an aibo in their "little" stage rather than adult stage. It is possible there is more variation. If you'd like to contribute to this research and have a cloud-connected ERS-1000, let me know.</p>

<p>The dynamic values are:</p>
<ul>
  <li>anticipation_surprise</li>
  <li>fear_anger</li>
  <li>joy_sadness</li>
  <li>trust_disgust</li>
</ul>

<p>These values scale and are relatively high-precision decimals.</p>

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

<p>These values can be summarized as ERS-1000 serials with "editions" /A through /Z, identical serials with "ERS" replaced for "SR1", and five special serials with especially unknown purposes.</p>

<p class="disclaimer">the song recommendation is: sm43429658. written 02/26/2024</p>
