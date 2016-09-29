
function buildDom(text) {
    var div = document.createElement('div');
    div.innerHTML = text;
    return div.firstChild;
}

function fetchAttrs(node) { // getting attributes object for element
    return node && Array.prototype.reduce.call(node.attributes, function(list, attribute) {
            list[attribute.name] = attribute.value;
            return list;
        }, {}) || {};
}

function traverseElement(element,argPrefix) {
    if (element.nodeType === Node.TEXT_NODE)
        return; // skipping text elements

    var attrs = fetchAttrs(element);
    var prefix = argPrefix + "/" + element.tagName; // build element path
    if (Object.keys(attrs).length !== 0){
        prefix += "[" + Object.keys(attrs).map(value, function () {
                return "@" + value + ' = "' + attrs[value] + '"'
            }).join(" and ") + "]"; // append arguments
    }

    console.log(prefix);

    var children = element.childNodes ;// iterating over children
    for (var i = 0; i < children.length; i++)
    {
        traverseElement(children[i], prefix)
    }
}

function extractElements(){
    var url = document.getElementById('webUrlId').value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {// when loaded

            console.log(this.responseText);
            var dom = buildDom(this.responseText);


            traverseElement(dom) ;// and traverse it
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();

}


