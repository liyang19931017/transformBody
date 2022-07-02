/**
 * 设置body根据剧width的缩放进行调成transfrom:scal的缩放
 * @param initWidth 初始化宽度，默认为1920
 * @param min 最小缩小比例
 * @param max 最大缩放比例
 * @param time 防抖时间
 * @returns 
 */
export const setTransfromBody = (initWidth:number = 1920 ,min?:number|undefined, max?:number|undefined, time: number = 500) => {
    if(max < min){
        console.log(`最小缩小比例${min}大于最大缩放比例${max}`);
        return;
    }
    document.body.style.transformOrigin = 'top left';
    const setZoom = () => {
        try{
            let scale = Math.round(window.innerWidth / initWidth * 100) / 100;
            if(typeof scale === 'number'){
                scale = max && Math.min(scale, max);
                scale = min && Math.max(scale, min);
                document.body.style.transform = `scale(${scale})`;
                document.body.style.width = `${100 / scale}%`
                document.body.style.height = `${100 / scale}%`
            }
        }catch(e){
            console.warn('设置样式失败');
            console.warn(e);
        }

    }
    const debounceSetZoom = debounce(setZoom, time);
    window.addEventListener('resize',debounceSetZoom);
}

export const debounce = <T extends Function>(fn: T, delay: number = 500) => {
    let debounceTimeout = null;
    return function (...args:any[]) {
         if(debounceTimeout){
             clearTimeout(debounceTimeout);
         }
         debounceTimeout = setTimeout(() => {
             fn(...args)
         }, delay);
    }
}