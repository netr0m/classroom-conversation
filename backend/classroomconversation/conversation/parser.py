from .const import START_NODES, END_NODE, CHOICE_NODE, RESPONSE_NODE

from .helpers import (
    get_node_label,
    get_node_shape,
    get_tree_root_graph,
    find_responses,
    find_illustrations,
)


def graphml_to_json(file, uniform):
    errors = []
    (tree, root, graph, graphml) = get_tree_root_graph(file)
    nodes = graph.findall(graphml.get("node"))

    out = {
        "uniform": uniform,
        "start": {},
        "end": "",
        "nodes": {},
        "choices": {},
        "responses": {},
    }

    for node in nodes:
        id = node.get("id")
        shape = get_node_shape(node, root)

        if shape is None:
            continue

        label = get_node_label(node, root)
        edges = graph.findall(graphml.get("edge") + "[@source='" + id + "']")

        out["nodes"][id] = {"id": id, "shape": shape}

        illustrations, _illustration_errors = find_illustrations(edges, root, graph, illustration_type="any")
        if _illustration_errors:
            errors += _illustration_errors
        
        if shape in START_NODES:
            out["start"] = {
                "id": id,
                "label": label,
                "shape": shape,
                "firstQuestion": edges[0].get("target"),
            }
        elif shape == END_NODE:
            out["end"] = id
        else:
            responses = find_responses(edges, uniform, root, graph)
            if shape == CHOICE_NODE:
                out["choices"][id] = {
                    "id": id,
                    "shape": shape,
                    "label": label,
                    "responses": responses,
                    "illustrations": illustrations,
                }
            elif shape == RESPONSE_NODE:
                out["responses"][id] = {
                    "id": id,
                    "shape": shape,
                    "label": label,
                    "illustrations": illustrations,
                    "links": responses
                }

    return out, errors
