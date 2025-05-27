export function flattenBookmarks(tree) {
    const flatArray = [];

    function traverse(node) {
        if (node.url) {
            // Если это узел с URL (закладка), добавляем в массив
            flatArray.push({
                id: node.id,
                title: node.title,
                url: node.url,
                index: node.index
            });
        }

        if (node.children) {
            // Если у узла есть дочерние элементы, обходим их рекурсивно
            node.children.forEach(traverse);
        }
    }

    tree.forEach(traverse); // Начинаем с корневых узлов
    return flatArray;
}
