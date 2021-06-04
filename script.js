function handler(e) {

    // oculta resultado na barra de endereço
    e.preventDefault();

    let movie = document.querySelector('.form_input').value
    if(movie) {
        const url = `http://www.omdbapi.com/?s=${movie}&apikey=fd39f5cd`;
        const options = {
            method: 'GET',
            mode: 'cors',
            redirect: 'follow',
            cache: 'default'
        }

        fetch(url, options)
            .then(function(resposta) {
                if(!resposta.ok) throw new Error('Erro ao requisitar requisição')    
                
                return resposta.json()
            })
            // Recebendo os dados dos filmes
            .then(function(data){

                console.log(data)
                let emptyContent = "";
                for(let i = 1; i < data.Search.length; i++){
                    emptyContent += `<li class="app-movies-all__card"> `;
                    emptyContent += `<figure class="app-movies-all__figure">`;
                    emptyContent += `<img class="app-movies-all__thumb" src="${data.Search[i].Poster}"/>`;
                    emptyContent += `</figure>`;
                    emptyContent += `<legend class="app-movies-all__legend">`;
                    emptyContent += `<span class="app-movies-all__year">${data.Search[i].Year}</span>`;
                    emptyContent += `<h2 class="app-movies-all__title">${data.Search[i].Title}</h2>`;
                    emptyContent += `</legend>`;
                    emptyContent += `</li>`;
                }

                document.getElementById('movies').innerHTML = emptyContent
            })

    } else {
        alert("DIGITE O NOME DE UM FILME!")
    }
}


window.onload = () => {
    const submit = document.querySelector('.form_submit')
    submit.addEventListener('click', handler)

}