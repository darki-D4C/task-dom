/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
  for (let i = 0; i < count; i++) {
    let temp = document.createElement(tag);
    temp.innerHTML = content;
    document.body.appendChild(temp);
  }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
  function buildTree(level, count) {
    let root,
        i = count - 1;
    if (level > 0) {
        if (document.getElementsByClassName('item_' + i).length == 0) {
            root = document.createElement('div');
            document.body.appendChild(root);
            root.setAttribute('class', 'item_' + count);
            buildTree(level - 1, count + 1);
        } else {
            for (root of document.getElementsByClassName('item_' + i)) {
                for (let i = 0; i < childrenCount; i++) {
                    let child = document.createElement('div');
                    child.setAttribute('class', 'item_' + count);
                    root.appendChild(child);
                }
            }
            buildTree(level - 1, count + 1);
            return root;
        }
    }
    return root;
  }
  
  return buildTree(level, 1);
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
  let tree = generateTree(2, 3);
    let root = document.getElementsByClassName('item_1')[0];
    for (let child of document.getElementsByClassName('item_2')) {
        if (child.tagName != 'SECTION') {
            let newNode = document.createElement('SECTION');
            newNode.setAttribute('class', 'item_2');
            for (let i = 0; i < 2; i++) {
                let newChild = child.firstChild;
                newNode.appendChild(newChild);
            }
            root.appendChild(newNode);
        }
    }
    for (let i = 0; i < 2; i++) {
        let deleteChild = document.getElementsByClassName('item_2')[0];
        root.removeChild(deleteChild);
    }
    return tree;
}
