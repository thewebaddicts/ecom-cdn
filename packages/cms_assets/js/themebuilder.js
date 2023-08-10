


    function refreshContent(elem){
        var url =  elem.attr('data-url');

        $.ajax({
            type: "GET",
            url: url,
            success: function (data) {
                elem.html(data);
                elem.addClass('content-loaded');
                console.log("loaded");
            }});



    }

    function refreshContents(){
        $(".refreshable-content:not(.content-loaded)").each(function(index , elem){
            refreshContent($(elem));
        });
    }


    function initSortable(){
        $( "#tb-editor-dropzone" ).sortable({axis: 'y'});
    }

    function openComponentParameters(id){
        var tbComponentEditorDropzone = window.parent.document.getElementById("tb-component-editor-dropzone");
        tbComponentEditorDropzone.innerHTML = '<iframe id="tb-component-editor-iframe" src="/cms/theme-builder/component/'+id+'/parameters" width="100%" marginheight="0" marginwidth="0"  ></iframe>';
        tbComponentEditorDropzone.style.bottom = 0;

        var iFrame = window.parent.document.getElementById('tb-component-editor-iframe');
        iFrame.style.height = iFrame.contentWindow.document.body.scrollHeight + 'px';
        return true;
    }

    function componentMove(elem , direction){
        var clickedComponent = elem.parents('.component-iframe-container');
        var nextComponent = elem.parents('.component-iframe-container').next();

        if(direction > 0){
            clickedComponent.prev().before(clickedComponent);
        }else{
            clickedComponent.next().after(clickedComponent);
        }
    }



    function componentSelect(elem) {
        $(window.parent.document.getElementById('save-layout')).click();
        var clickedComponent = elem.parents('.component-iframe-container');
        var id = clickedComponent.attr('data-id');

        if(!clickedComponent.hasClass("active-component")){
            openComponentParameters(id);
            var componentList =  document.getElementsByClassName("component-iframe-container");
            for (var i = 0; i < componentList.length; i++) {
                componentList[i].classList.remove('active-component');
            }
            clickedComponent.addClass('active-component');
        }
    }

    function componentEdit(elem , link){

        $(window.parent.document.getElementById('save-layout')).click();

        new Fancybox([
            {
                src: link,
                type: "iframe",
                opts: {
                    iframe: {
                        css: {
                            width: 800,
                        },
                    },
                },
            },
        ]);

    }

    function componentDelete(elem){
        var clickedComponent = elem.parents('.component-iframe-container');
        var id = clickedComponent.attr('data-id');
        clickedComponent.remove();
    }






