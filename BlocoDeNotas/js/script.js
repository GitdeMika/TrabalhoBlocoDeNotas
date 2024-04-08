/**
 * ===================== PRINCIPAIS OBJETOS  =================================
 */

let addNote = document.querySelector('#add-note');//Botão de para adicionar nota
let btncloseModal=  document.querySelector('#btn-close-modal'); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal'); //Modal para edição das notas
let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
let notes = document.querySelector('#notes');//Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
let btnCloseNote = document.querySelector("#close-modal-view");//icone para fechar modal de edição de nota.

/*===================== Função e Eventos  ===========================*/

addNote.addEventListener("click", (evt) =>{
    evt.preventDefault();
    modal.style.display = "block";
    addNote.style.display = "none";
    notes.style.display = "none";
});
btncloseModal.addEventListener("click", (evt) =>{
    evt.preventDefault();
    modal.style.display = "none";
    addNote.style.display = "block";
    notes.style.display = "flex";
});
btnSaveNote.addEventListener("click", (evt) =>{
    evt.preventDefault();
    data = {
        id: document.querySelector("#input-id").value,
        title: document.querySelector("#input-title").value ,
        content: document.querySelector("#input-content").value
    }
    console.log(data);
    saveNote(data);
});

btnCloseNote.addEventListener('click', (evt) =>{
    evt.preventDefault();
    modal.style.display = "none";
    addNote.style.display = "block";
    notes.style.display = "flex";
    modalView.style.display = "none";
    //divEdit.style.display = "none";
});

/*===================== Funções  ===========================*/

const saveNote = (note) => {
    console.log(note);
    let notes=loadNotes();
    note.lastTime = new Date().getTime();
    console.log(note);
    if(note.id.length < 1){ //Trim, usa-se quando é preciso remover espaços, "sujeiras"
        note.id = new Date().getTime();
        notes.push(note);
        document.querySelector('#input-id').value = note.id;
    }
    
    else{
        notes.forEach((item, i) => {
            if(item.id == note.id){
                notes[i] = note;
            }
        });
    }

    notes = JSON.stringify(notes);

    localStorage.setItem('notes', notes);

    listNotes();

};

const loadNotes = () =>{
    let notes = localStorage.getItem("notes");
    if(!notes){
        notes = [];//Representação do array
    }
    else{
        notes = JSON.parse(notes);
    }
    return notes;

}

const listNotes = () => {
    notes.innerHTML = '';
    let listnotes = loadNotes();
    console.log(listnotes);
    listnotes.forEach((note) => {
        let divCard = document.createElement('div');
        divCard.className = 'card';
        divCard.style.width = '25rem';
        divCard.style.margin = '6px';
        divCard.style.borderColor = 'blue';
        divCard.style.borderRadius = '10px'
        let divCardBody = document.createElement('div');
        divCardBody.classname = 'card-body';
        divCard.appendChild(divCardBody);
        let h5 = document.createElement('h5');
        h5.innerText = note.title;
        divCardBody.appendChild(h5);
        let pContent = document.createElement('p');
        pContent.innerText = note.content;
        divCardBody.appendChild(pContent);
        let pLastTime = document.createElement('p');
        pLastTime.innerText = "Atualizado em: "+DateFormat(note.lastTime);
        divCardBody.appendChild(pLastTime);

        //----------Icones----------//
        /*let divIconA = document.createElement('div');
        divIconA.className = 'Trash';
        divCardBody.appendChild(divIconA);
        let IconTrash = document.createElement('i');
        IconTrash.style.color = 'red';
        IconTrash.className = 'bi bi-trash';
        divIconA.appendChild(IconTrash);
        let divIconB = document.createElement('div');
        divIconB.className = 'Disk';
        divCardBody.appendChild(divIconB);
        let IconDisk = document.createElement('i');
        IconDisk.style.color = 'blue';
        IconDisk.className = 'bi bi-sd-card';
        divIconB.appendChild(IconDisk);*/

        notes.appendChild(divCard);

        divCard.addEventListener('click', (evt) =>{
            showNote(note);
        })
    });
}

const showNote = (note) =>{
    notes.style.display = 'none';
    addNote.style.display = 'none';
    modalView.style.display = 'block';
    document.querySelector('#title-note').innerText = note.title; //.innerHTML = "<h1>"+note.title+"</h1>";
    document.querySelector('#content-note').innerHTML = `<p>${note.content}</p>
    <p>Última alteração: ${DateFormat(note.lastTime)}</p>`;

    document.querySelector('#controls-note').innerHTML = '';

    let divEdit = document.createElement('div');
    let iEdit = document.createElement('i');
    iEdit.className = 'bi bi-pen';
    iEdit.style.color = 'green';
    divEdit.appendChild(iEdit);
    document.querySelector('#controls-note').appendChild(divEdit);
    divEdit.addEventListener('click', () => {
        document.querySelector("#input-id").value = note.id;
        document.querySelector("#input-title").value = note.title;
        document.querySelector("#input-content").value = note.content;
        modal.style.display = "block";
        addNote.style.display = "none";
        notes.style.display = "none";
        modalView.style.display = "none";
    });
    
    let divDel = document.createElement('div');
    let iDel = document.createElement('i');
    iDel.className = 'bi bi-trash';
    iDel.style.color = 'red';
    divDel.appendChild(iDel);
    document.querySelector('#controls-note').appendChild(divDel);
    divDel.addEventListener('click', () => deleteNote(note.id));
    const deleteNote = (id) => {
        let notes = loadNotes();
        notes = notes.filter(note => note.id !== id);
        localStorage.setItem('notes', JSON.stringify(notes));
        listNotes();
    };
}

const DateFormat = (timestamp) => {
    let date = new Date(timestamp);//Converte a data 
    date = date.toLocaleDateString("pt-BR");
    return date;
};


listNotes();
