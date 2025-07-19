//code by @cancerberoSgx on github

function init(canvas){
    var fabricCanvas = new fabric.Canvas(canvas);
    let initialPos, bounds, rect, dragging = false;
    const options = {
        rectProps: {
            stroke: 'black',
            strokeWidth: 2,
            fill: ''
        }
    }
}

function onMouseDown(e) {
    initialPos = { ...e.pointer }
       bounds = {}
      if(options.drawRect){
      rect = new fabric.Rect({
        left: initialPos.x,
        top: initialPos.y,
        width: 0, height: 0,
       ...options.rectProps
      });}
       fabricCanvas.add(rect)
  }

  function update(pointer) {
    if (initialPos.x > pointer.x) {
      bounds.x = Math.max(0, pointer.x)
      bounds.width = initialPos.x - bounds.x
    } else {
      bounds.x = initialPos.x
      bounds.width = pointer.x - initialPos.x
    }
    if (initialPos.y > pointer.y) {
      bounds.y = Math.max(0, pointer.y)
      bounds.height = initialPos.y - bounds.y
    } else {
      bounds.height = pointer.y - initialPos.y
      bounds.y = initialPos.y
    }
    if(options.drawRect){
      rect.left = bounds.x
      rect.top = bounds.y
      rect.width = bounds.width
      rect.height = bounds.height
      rect.dirty = true
      fabricCanvas.requestRenderAllBound()
    }
  }
  function onMouseMove(e) {
    if (!dragging) {
      return
    }
    requestAnimationFrame(() => update(e.pointer))
  }
  function onMouseUp(e) {
      dragging = false;
    if (options.drawRect && rect && (rect.width == 0 || rect.height === 0)) {
      fabricCanvas.remove(rect)
    }
    if(!options.drawRect||!rect){
      rect = new fabric.Rect({
        ...bounds, left: bounds.x, top: bounds.y,
       ...options.rectProps
      });
       fabricCanvas.add(rect)  
      rect.dirty = true
      fabricCanvas.requestRenderAllBound()
    }
    rect.setCoords() // important! 
    uninstall()
  }
  function install() {
    dragging = false; rect = null
    fabricCanvas.on('mouse:down', onMouseDown);
    fabricCanvas.on('mouse:move', onMouseMove);
    fabricCanvas.on('mouse:up', onMouseUp);
  }
  function uninstall() {
    dragging = false; rect = null
    fabricCanvas.off('mouse:down', onMouseDown);
    fabricCanvas.off('mouse:move', onMouseMove);
    fabricCanvas.off('mouse:up', onMouseUp);
  }
