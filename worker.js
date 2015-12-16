this.addEventListener('message', function(e){
    e.data.forEach(function(){

    })
    this.postMessage('hey worker');
    this.close();
});