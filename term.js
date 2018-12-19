$(document).ready(function() {

	var original = [],
		wikia = [],
		wikidot = [],
		proposal = [],
		alexaPlayDespacito = true;

	var erase = () => {
		let tableContent = document.getElementsByTagName('tbody');
		tableContent[tableContent.length - 1].innerHTML = '';
	}

	var changeSubTitle = (subTitle) => {
		let getSubTitle = document.getElementById('subTitle')
		getSubTitle.innerHTML = subTitle;
	}

	/*Funciones Check*/

	var check = function(thing) {
		if (thing == undefined) {
			return ' ';
		} else {
			return thing;
		};
	};

	var n_colspan = function(first_char) {
		var word_with_first_char = '';
		for (var i = original.length - 1; i >= 0; i--) {
			if (original[i].startsWith(first_char)) {
				word_with_first_char += ', ' + original[i];
			};
		};
		return word_with_first_char.split(', ').length;
	}

	/* Request */

	var getData = (json_name) => {

		const xhttp = new XMLHttpRequest();

		xhttp.open('GET', 'Topicos/' + json_name + '.json', true);

		xhttp.send();

		xhttp.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				var proposal_data = JSON.parse(this.responseText)

				for (var i = proposal_data['words'].length - 1; i >= 0; i--) {
					original = original.concat(proposal_data['words'][i][0]);
					wikia = wikia.concat(proposal_data['words'][i][1]);
					wikidot = wikidot.concat(proposal_data['words'][i][2]);
					proposal = proposal.concat(proposal_data['words'][i][3]);
				};
				
				/*Modificación del DOM*/

				var prop_table = $('#prop');
				prop_table[0].innerHTML += '<tr></tr>'.repeat(original.length);
				prop_table = $('#prop tr');

				var letter_th = '';

				for (var i = 1; i < prop_table.length; i++) {
					var head_inf = original.pop(),
						letter = head_inf.charAt(0);

					if (letter == letter_th) {} else if (letter != letter_th) {
						prop_table[i].innerHTML += '<th rowspan="' + n_colspan(letter) + '">' + letter + '</th>'

						letter_th = letter
					};

					prop_table[i].innerHTML += '<td><i>' + check(head_inf) + '</i></td>';
					prop_table[i].innerHTML += '<td>' + check(wikia.pop()) + '</td>';
					prop_table[i].innerHTML += '<td>' + check(wikidot.pop()) + '</td>';
					prop_table[i].innerHTML += '<td>' + check(proposal.pop()) + '</td>';
				};
			};
		};
	}

	if(alexaPlayDespacito) {
		const json_name = document.getElementById("generico").attributes['class']['nodeValue']
		getData(json_name)
	}

	alexaPlayDespacito = false

	$("#generico").click(() => {
		erase(); changeSubTitle('Términos Genéricos')
		const json_name = document.getElementById("generico").attributes['class']['nodeValue']
		getData(json_name)
	})

	$("#esot").click(() => {
		erase(); changeSubTitle('Términos Esotéricos')
		const json_name = document.getElementById("esot").attributes['class']['nodeValue']
		getData(json_name)
	})

	$("#tec").click(() => {
		erase(); changeSubTitle('Tecnología')
		const json_name = document.getElementById("tec").attributes['class']['nodeValue']
		getData(json_name)
	})

	$("#gdi").click(() => {
		erase(); changeSubTitle('Grupos de Interes')
		const json_name = document.getElementById("gdi").attributes['class']['nodeValue']
		getData(json_name)
	})

	$("#mtf").click(() => {
		erase(); changeSubTitle('Movile Task Forces')
		const json_name = document.getElementById("mtf").attributes['class']['nodeValue']
		getData(json_name)
	})

	$("#tag").click(() => {
		erase(); changeSubTitle('Etiquetas')
		const json_name = document.getElementById("tag").attributes['class']['nodeValue']
		getData(json_name)
	})
});