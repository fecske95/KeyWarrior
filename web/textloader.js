class textloader {  
    constructor() {}
    
/*
    GetRandomText() {
        document.getElementById('file') = function() {
            
            var file = this.files[0];
            
            var reader = new FileReader();
            reader.onload = function(progressEvent) {
                
                var lines = this.result.split('\n');
                var randomline = Math.floor((Math.random()*(lines.length - 1)) + 1);
                for (var line = 0; line < lines.length; line++) {
                    if (line === randomline) {
                        currentText = lines[line];
                    }
                }
            };
            reader.readAsText(file);
        };
    }
*/
    GetRandomText() {
        var rawfile = new XMLHttpRequest();
        var allText;
        rawfile.open("GET","Texts/Tesztszoveg.txt",false);
        rawfile.onreadystatechange = function() 
        {

            if (rawfile.readyState === 4)
                {
                    if (rawfile.status === 200 || rawfile.status == 0)
                        {
                            allText = rawfile.responseText;          
                        }
                }
        }
        rawfile.send(null);
        return allText;
    }
}