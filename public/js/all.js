const reArrangeWordIds = ()=>{
    allWordsRows = $("tr.word-list-class>th")
    numberOfWords = allWordsRows.length
    for(i=0;i<numberOfWords;i++){
        allWordsRows[i].innerText = (i+1).toString()
    }
}

const deleteRow = (id) => {
    let element = $(`tr#${id}`);
    element.remove()
    reArrangeWordIds()
}

$(".deleteButton").on("click", function(event){
    word_id = $(this).attr('id')

    $.ajax({
        url:`/delete/${word_id}`,
        method:"DELETE"
    })
    .then(deleteRow(word_id))
})