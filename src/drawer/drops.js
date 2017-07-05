export default (container, scales, configuration) =>
    (data) => {
        const dropLines = container
            .selectAll('.drop-line')
            .data(data)
            .enter()
            .append('g')
            .classed('drop-line', true)
            .attr('width', scales.x.range()[1])
            .attr('transform', (d, idx) => `translate(0, ${scales.y(idx)})`)
            .attr('fill', configuration.eventLineColor);

        const drops = dropLines.selectAll('.drop');

        drops
            .data(d => d.data)
            .enter()
            .append('circle')
            .classed('drop', true)
            .attr('r', configuration.radius)
            .attr('cx', d => scales.x(configuration.date(d)))
            .attr('cy', (d, idx, nodes, currentNode) => {
               var series = d3.select(nodes[idx].parentNode).datum().name;
               return scales.yData[series](configuration.data(d.value));
            })
            .attr('fill', configuration.eventColor)
            .on('click', configuration.click)
            .on('mouseover', configuration.mouseover)
            .on('mouseout', configuration.mouseout);

        // unregister previous event handlers to prevent from memory leaks
        drops
            .exit()
            .on('click', null)
            .on('mouseout', null)
            .on('mouseover', null)
            .remove();

        dropLines.exit().remove();
    };
