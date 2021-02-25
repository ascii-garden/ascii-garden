var html = '<h3> sigid </h3>';

var section1 = ['rfi', 'ft8', 'sstv']
for (i = 0; i<section1.length; i++){
	html += '<div class="navlink"><a href="content/' + section1[i] + '.html">' + section1[i] + '</a></div>'
}


document.getElementById("sidebar").innerHTML = html;
			