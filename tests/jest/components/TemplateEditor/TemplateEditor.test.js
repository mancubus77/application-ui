/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 * Copyright (c) 2020 Red Hat, Inc.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

"use strict";

import React from "react";
import { BrowserRouter } from 'react-router-dom'
import { TemplateEditor } from "../../../../src-web/components/TemplateEditor";
import renderer from "react-test-renderer";
import applicationTemplate from "../../../../src-web/components/ApplicationCreationPage/templates/template.hbs";
import { shallow } from "enzyme";
import _ from "lodash";
import { mount } from "enzyme";

import { controlData, portals } from "../TestingData";

describe("TemplateEditor component", () => {
  it("renders as expected", () => {
    const component = renderer.create(
      <BrowserRouter>
        <TemplateEditor
          template={applicationTemplate}
          controlData={controlData}
          portals={portals}
          type={"application"}
          title={"creation.app.yaml"}
          locale={"en-US"}
        />
      </BrowserRouter>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});

describe("on control change function", () => {
  it("renders as expected", () => {
    const wrapper = mount(
        <BrowserRouter>
      <TemplateEditor
        template={applicationTemplate}
        controlData={controlData}
        portals={portals}
      />
      </BrowserRouter>
    );
    const evt = {
      target: {
        value: "value-testing"
      },
      selectedItems: ["selectedItems-testing-1", "selectedItems-testing-2"]
    };

    wrapper
      .find("#name")
      .at(0)
      .simulate("change", evt);
    wrapper
      .find("#namespace")
      .at(0)
      .simulate("change", evt);

    wrapper
      .find("#main-")
      .at(0)
      .simulate("click", evt);
  });
});

describe("getResourceJSON function", () => {
  const result = [
    {
      apiVersion: "app.k8s.io/v1beta1",
      kind: "Application",
      metadata: { name: null, namespace: null },
      spec: {
        componentKinds: [
          { group: "apps.open-cluster-management.io", kind: "Subscription" }
        ],
        descriptor: {},
        selector: {
          matchExpressions: [{ key: "app", operator: "In", values: [null] }]
        }
      }
    }
  ];

  it("renders as expected", () => {
    const wrapper = shallow(
      <BrowserRouter>
        <TemplateEditor
          template={applicationTemplate}
          controlData={controlData}
          portals={portals}
        />
      </BrowserRouter>
    );
    expect(wrapper.find('TemplateEditor').dive().instance().getResourceJSON()).toEqual(result);
  });
});
