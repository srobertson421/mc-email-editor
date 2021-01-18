function createComponents(htmlString) {
  const tempTemplate = document.createElement('template');
  tempTemplate.innerHTML = htmlString;
  const components = tempTemplate.content.querySelectorAll('[mc\\:repeatable]');
  const componentTemplates = [];
  components.forEach(comp => {
    const temp = document.createElement('template');
    temp.innerHTML = comp.outerHTML;
    componentTemplates.push(temp);
  });

  return componentTemplates;
}

export default createComponents;