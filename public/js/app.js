$("#category-add-form").hide()

// function hideNewCategoryForm = () => {
    
// }

const reArrangeWordIds = ()=>{
    allWordsRows = $("tr.word-list-class>th")
    numberOfWords = allWordsRows.length
    for(i=0;i<numberOfWords;i++){
        allWordsRows[i].innerText = (i+1).toString()
    }
}

const changeButtonAppearence = () => {
    const button = $("#saveButton")
    button.css("background","blue")
    button.html("save")
}

const clearResultSection = () =>{
    $("ul.meaning-class").remove()
    
}

const dictionaryApi = async (word)=>{
    const cartSection = $("#informationSection")
    const resultListSectionTag = `<ul class='meaning-class'></ul>`
    cartSection.after(resultListSectionTag)
    const resultListSection = $('ul.meaning-class')

    const api_key = "f1c12a32-ec18-4b3c-9989-c0769582b6ad"
    const url = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/"+ word + "?key=" + api_key;
    
    try{
        res = await fetch(url)
    }catch(error){
        alert("internet or proxy connection should be checked")
        return
    }
            
    const jsonResponse = await res.json()

    // changeButtonAppearence()
    let counter = 1
    jsonResponse.map((result,index)=>{
        result.shortdef.map(shortDef=>{
            resultLi = `
                <li class='meaning-li'>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input mr-2">
                        <p id='${counter}' class="def">${shortDef}</p> 
                    </div>     
                </li>`
            resultListSection.append(resultLi)
            counter++
        })
    })
}

const deleteRow = (id) => {
    let element = $(`tr#${id}`);
    element.remove()
    reArrangeWordIds()
}

const clearInputs = ()=>{    
    wordNameInput = $("input[name='word_name']")
    wordMeaningInput = $("input[name='word_meaning']")

    wordNameInput.val("")
    wordMeaningInput.val("")
}

$("#searchButton").on("click",function(event){
    event.preventDefault()

    word_name = $('input[name="word_name"]').val();
    word_meaning = $('input[name="word_meaning"]').val()
    if(word_name===""){
        return
    }
    if($("ul.meaning-calss")){
        clearResultSection()
    }
    dictionaryApi(word_name)

    .then($("button#saveButton").attr("disabled",false))
})

$(".deleteButton").on("click", function(event){
    word_id = $(this).attr('id')

    $.ajax({
        url:`/delete/${word_id}`,
        method:"DELETE"
    })
    .then(deleteRow(word_id))
})


$("button#saveButton").on("click",function(event){
    event.preventDefault()
    
    let text = ""
    let categorySelected = $("#categorySelectForm").val()

    $("input:checkbox:checked").each(function(){
        text = ($(this).siblings()[0].innerText) + "\n" + text;
    })
    
    //choosing the first definition if nothing is choosed
    if(text===""){
        text = $("p#1.def")[0].innerText
    }
    

    $.ajax({
        url:"/add",
        method:"POST",
        data:{
            category:categorySelected,
            word_name:word_name,
            word_meaning:word_meaning,
            full_english_meaning:text,
        }
    })
    .then(clearInputs)
    .then(clearResultSection)
})

$("#add-category-btn").click(function(event){
    event.preventDefault()

    $("#category-add-form").toggle()
})

$("#confirm-category-name").click(function(event){
    event.preventDefault()

    const newCategoryName = $("#newCategoryInput").val()

    $.ajax({
        url:"/add-category",
        method:"POST",
        data:{
            category_name:newCategoryName
        }
    })
    .then($("#category-add-form").hide())
    .then($("#categorySelectForm").prepend(`<option>${newCategoryName}</option>`))
    .then($("#categorySelectForm").prop("selectedIndex",0))
    
})

$("#delete-category-btn").on("click",function(event){
    event.preventDefault()
    const categoryName = $("#categorySelectForm").val()
    $(`#${categoryName}`).remove()
    $.ajax({
        url:`/delete-category/${categoryName}`,
        method:"DELETE"
    })
})

