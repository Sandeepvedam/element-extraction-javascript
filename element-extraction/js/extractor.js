

var textBoxes=[];
var buttons=[];
var links=[];
var spans=[];
var divs=[];
var images=[];
var selects=[];
var checkboxes=[];
var labels=[];


function buildDom(text) {
    var div = document.createElement('div');
    div.innerHTML = text;
    var body = document.getElementsByTagName("body")[0];
    return div.firstChild;
}

function fetchAttrs(node) { // getting attributes object for element
    return node && Array.prototype.reduce.call(node.attributes, function(list, attribute) {
            list[attribute.name] = attribute.value;
            return list;
        }, {}) || {};
}

function traverseElement(element) {

    if (element.nodeType === Node.TEXT_NODE)
        return; // skipping text elements

    var attrs = fetchAttrs(element);
    var prefix =  "//" + element.tagName + " "; // build element path
    if (Object.keys(attrs).length !== 0){
        prefix += "[" + Object.keys(attrs).map((value, index) => {
                return "@" + value + ' = "' + attrs[value] + '"'
            }).join(" and ") + "]"; // append arguments
    }

    var tagName = element.tagName.toLowerCase();
    switch (tagName) {
        case "input":
            if(element.type.toLowerCase()==='text'|| element.type.toLowerCase()==='email'|| element.type.toLowerCase()==='password') {
                textBoxes.push(prefix);
            }else if(element.type.toLowerCase()==='submit') {
                buttons.push(prefix);
            }else{
                console.log("none");
            }
            break;
        case "button":
            buttons.push(prefix);
            break;

        case "a":
            links.push(prefix);
            break;

        case "img":
            images.push(prefix);
            break;
        case "span":
            spans.push(prefix);
            break;

        case "checkbox":
            checkboxes.push(prefix);
            break;
        case "div":
            divs.push(prefix);
            break;
        case "select":
            selects.push(prefix);
            break;
        case "label":
            labels.push(prefix);
            break;

    }
}


function appendElements(elements){
   
}



function extractElements(){
    $("#elements").empty();
	 textBoxes=[];
 buttons=[];
 links=[];
 spans=[];
 divs=[];
 images=[];
 selects=[];
 checkboxes=[];
 labels=[];
    var url = document.getElementById('webUrlId').value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {// when loaded

            //console.log(this.responseText);
            document.getElementById('demo').innerHTML = this.responseText;
            var x = document.getElementById('demo').getElementsByTagName("*");

            var  tags = '';
            for(i = 0; i < x.length; i++)
            {
                traverseElement(x[i]);
                var tag = x[i].tagName;
                tags = tags + "\n" + tag;
            }
            if(textBoxes.length!=0) {
                $("#elements").append("<h3>Text Boxes</h3>");
                $.each(textBoxes, function( index, value ) {
                    $("#elements").append("<div>"+value+"</div>");
                });
            }

            if(buttons.length!=0) {
                $("#elements").append("<h3>Buttons</h3>");
                $.each(buttons, function( index, value ) {
                    $("#elements").append("<div>"+value+"</div>");
                });
            }

            if(links.length!=0) {
                $("#elements").append("<h3>Links</h3>");
                $.each(links, function( index, value ) {
                    $("#elements").append("<div>"+value+"</div>");
                });
            }

            if(spans.length!=0) {
                $("#elements").append("<h3>Spans</h3>");
                $.each(spans, function( index, value ) {
                    $("#elements").append("<div>"+value+"</div>");
                });
            }

            if(divs.length!=0) {
                $("#elements").append("<h3>Divs</h3>");
                $.each(divs, function( index, value ) {
                    $("#elements").append("<div>"+value+"</div>");
                });
            }

            if(images.length!=0) {
                $("#elements").append("<h3>Images</h3>");
                $.each(images, function( index, value ) {
                    $("#elements").append("<div>"+value+"</div>");
                });
            }

            if(selects.length!=0) {
                $("#elements").append("<h3>Selects</h3>");
                $.each(selects, function( index, value ) {
                    $("#elements").append("<div>"+value+"</div>");
                });
            }

            if(checkboxes.length!=0) {
                $("#elements").append("<h3>Check Boxes</h3>");
                $.each(checkboxes, function( index, value ) {
                    $("#elements").append("<div>"+value+"</div>");
                });
            }

            if(labels.length!=0) {
                $("#elements").append("<h3>Labels</h3>");
                $.each(labels, function( index, value ) {
                    $("#elements").append("<div>"+value+"</div>");
                });
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();

}


