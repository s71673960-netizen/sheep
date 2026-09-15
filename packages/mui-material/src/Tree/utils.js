'use client';

export function getAllKeys(treeData) {
  const keys = [];
  const traverse = (nodes) => {
    if (!nodes) return;
    nodes.forEach((node) => {
      keys.push(node.key);
      if (node.children) traverse(node.children);
    });
  };
  traverse(treeData);
  return keys;
}

export function buildKeyEntities(treeData) {
  const entities = {};
  const traverse = (nodes, parent) => {
    if (!nodes) return;
    nodes.forEach((node, index) => {
      const entity = { node, parent, children: [], index };
      entities[node.key] = entity;
      if (parent) {
        parent.children.push(entity);
      }
      if (node.children) {
        traverse(node.children, entity);
      }
    });
  };
  traverse(treeData, null);
  return entities;
}

function getChildKeys(entity) {
  const keys = [];
  const traverse = (ent) => {
    if (!ent.children) return;
    ent.children.forEach((child) => {
      if (!child.node.disabled && child.node.checkable !== false && !child.node.disableCheckbox) {
        keys.push(child.node.key);
      }
      traverse(child);
    });
  };
  traverse(entity);
  return keys;
}

export function conductCheck(keySet, checked, key, keyEntities) {
  const newCheckedKeys = new Set(keySet);
  const halfCheckedKeys = new Set();

  const entity = keyEntities[key];
  if (!entity) return { checkedKeys: [...newCheckedKeys], halfCheckedKeys: [] };

  if (checked) {
    newCheckedKeys.add(key);
    const childKeys = getChildKeys(entity);
    childKeys.forEach((k) => newCheckedKeys.add(k));
  } else {
    newCheckedKeys.delete(key);
    const childKeys = getChildKeys(entity);
    childKeys.forEach((k) => newCheckedKeys.delete(k));
  }

  // Update parent chain
  const updateParent = (ent) => {
    const parent = ent.parent;
    if (!parent) return;

    const parentKey = parent.node.key;
    const siblings = parent.children.filter(
      (c) => !c.node.disabled && c.node.checkable !== false && !c.node.disableCheckbox
    );

    const allChecked = siblings.length > 0 && siblings.every((c) => newCheckedKeys.has(c.node.key));
    const someChecked = siblings.some(
      (c) => newCheckedKeys.has(c.node.key) || halfCheckedKeys.has(c.node.key)
    );

    if (allChecked) {
      newCheckedKeys.add(parentKey);
      halfCheckedKeys.delete(parentKey);
    } else if (someChecked) {
      newCheckedKeys.delete(parentKey);
      halfCheckedKeys.add(parentKey);
    } else {
      newCheckedKeys.delete(parentKey);
      halfCheckedKeys.delete(parentKey);
    }

    updateParent(parent);
  };

  updateParent(entity);

  return {
    checkedKeys: [...newCheckedKeys],
    halfCheckedKeys: [...halfCheckedKeys],
  };
}

export function calcCheckState(checkedKeySet, keyEntities) {
  const halfCheckedKeys = new Set();

  Object.keys(keyEntities).forEach((key) => {
    const entity = keyEntities[key];
    if (!entity.children || entity.children.length === 0) return;

    const validChildren = entity.children.filter(
      (c) => !c.node.disabled && c.node.checkable !== false && !c.node.disableCheckbox
    );
    if (validChildren.length === 0) return;

    const allChecked = validChildren.every((c) => checkedKeySet.has(c.node.key));
    const someChecked = validChildren.some(
      (c) => checkedKeySet.has(c.node.key) || halfCheckedKeys.has(c.node.key)
    );

    if (!allChecked && someChecked) {
      halfCheckedKeys.add(key);
    }
  });

  return halfCheckedKeys;
}
