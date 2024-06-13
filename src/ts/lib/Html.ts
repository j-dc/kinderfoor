export default  class Html {
    public static qs(query:string):HTMLElement {
        return document.querySelector(query);
    }

    public static qsa(query:string):HTMLElement[] {
        return [].slice.call(document.querySelectorAll(query));
    }

}