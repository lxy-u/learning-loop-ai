// 使用假数据模拟API响应
export async function POST(req: Request) {
  try {
    const { input, retry = false, previousQuestion = null, previousAnswer = null, userAnswer = null } = await req.json();

    // 模拟知识点讲解和题目数据
    const mockData: Record<string, any> = {
      "什么是NPV": {
        knowledge: `1. 通俗解释\n净现值（NPV）是指一个投资项目在未来产生的现金流入现值减去初始投资成本后的余额。简单来说，就是把未来的钱折算到现在，看看这个投资是否值得。\n\n2. 举例说明\n假设你投资1000元，年利率10%，第一年收回600元，第二年收回500元。那么NPV计算为：600/(1+10%) + 500/(1+10%)² - 1000 = 545.45 + 413.22 - 1000 = -41.33元，说明这个投资不值得。\n\n3. 常见误区\n- 忽略时间价值：不同时间的钱价值不同\n- 选择错误的折现率：折现率过高会低估项目价值\n- 只看NPV数值：还需考虑项目规模和风险`,
        question: "以下关于NPV的说法，正确的是？",
        options: ["A. NPV为负时项目值得投资", "B. NPV计算不需要考虑时间价值", "C. 折现率越高，NPV越大", "D. NPV为正时项目通常值得投资"],
        correctAnswer: "D",
        explanation: ""
      },
      "什么是GDP": {
        knowledge: `1. 通俗解释\nGDP（国内生产总值）是一个国家在一定时期内（通常是一年）生产的所有最终产品和服务的市场价值总和。它是衡量一个国家经济规模和增长的重要指标。\n\n2. 举例说明\n假设一个国家一年生产了100辆汽车（每辆10万元）、200台电脑（每台5000元），以及提供了价值5000万元的服务，那么GDP就是100×10万 + 200×0.5万 + 5000万 = 20100万元。\n\n3. 常见误区\n- 认为GDP越高生活水平越好：GDP不考虑分配公平性\n- 忽略非市场活动：家务劳动等不被计入GDP\n- 只看总量：人均GDP更能反映生活水平`,
        question: "以下哪项会被计入GDP？",
        options: ["A. 家庭主妇的家务劳动", "B. 二手商品的交易", "C. 政府提供的公共服务", "D. 黑市交易"],
        correctAnswer: "C",
        explanation: ""
      },
      "什么是机器学习": {
        knowledge: `1. 通俗解释\n机器学习是人工智能的一个分支，让计算机通过学习数据来获取知识，而不需要明确的编程指令。简单来说，就是让计算机从经验中学习。\n\n2. 举例说明\n比如垃圾邮件分类系统，通过学习大量标记为垃圾邮件和非垃圾邮件的邮件数据，计算机可以自动识别新邮件是否为垃圾邮件。\n\n3. 常见误区\n- 认为机器学习就是人工智能：机器学习是AI的一部分\n- 认为机器学习不需要数据：数据是机器学习的基础\n- 认为机器学习模型总是正确的：模型可能会出错，需要持续优化`,
        question: "机器学习的核心是什么？",
        options: ["A. 明确的编程规则", "B. 从数据中学习", "C. 人工干预", "D. 固定的算法"],
        correctAnswer: "B",
        explanation: ""
      }
    };

    // 处理重试（再来一道）的情况
    if (retry && previousQuestion && previousAnswer && userAnswer) {
      // 为每个知识点准备多个备用题目
      const retryQuestions: Record<string, any> = {
        "什么是NPV": {
          question: "如果一个项目的NPV为零，意味着什么？",
          options: ["A. 项目没有任何价值", "B. 项目的回报率等于折现率", "C. 项目一定会亏损", "D. 项目的现金流为零"],
          correctAnswer: "B",
          explanation: `1. 错因分析：你可能误解了NPV为零的含义。NPV为零并不意味着项目没有价值，而是表示项目的回报率刚好等于折现率。\n\n2. 正确思路：NPV的计算公式是未来现金流现值减去初始投资。当NPV为零时，说明项目的预期回报率等于我们使用的折现率，此时项目处于盈亏平衡状态。\n\n3. 正确答案：B选项正确，因为当NPV为零时，项目的内部收益率（IRR）等于折现率。`
        },
        "什么是GDP": {
          question: "GDP平减指数的作用是什么？",
          options: ["A. 衡量通货膨胀", "B. 计算实际GDP", "C. 调整名义GDP", "D. 以上都是"],
          correctAnswer: "D",
          explanation: `1. 错因分析：你可能对GDP平减指数的功能理解不全面。GDP平减指数不仅可以衡量通货膨胀，还可以用于计算实际GDP和调整名义GDP。\n\n2. 正确思路：GDP平减指数是名义GDP与实际GDP的比率，它反映了物价水平的变化。通过它可以将名义GDP调整为实际GDP，从而真实反映经济增长。\n\n3. 正确答案：D选项正确，因为GDP平减指数具有以上所有功能。`
        },
        "什么是机器学习": {
          question: "以下哪种算法属于监督学习？",
          options: ["A. K-means聚类", "B. 主成分分析（PCA）", "C. 线性回归", "D. 关联规则挖掘"],
          correctAnswer: "C",
          explanation: `1. 错因分析：你可能对监督学习和无监督学习的区别理解不清。监督学习需要标记数据，而无监督学习则不需要。\n\n2. 正确思路：线性回归是一种监督学习算法，因为它需要使用标记好的训练数据（输入特征和对应的输出值）来学习模型参数。\n\n3. 正确答案：C选项正确，因为线性回归属于监督学习，而其他选项都属于无监督学习。`
        }
      };

      // 查找对应的重试题目
      let result = null;
      for (const key in mockData) {
        if (mockData[key].question === previousQuestion) {
          result = retryQuestions[key];
          break;
        }
      }

      if (result) {
        return Response.json({
          knowledge: mockData[Object.keys(mockData)[0]].knowledge, // 保持相同的知识点讲解
          ...result
        });
      }
    }

    // 查找匹配的知识点
    let result = mockData[input];

    // 如果没有找到匹配的知识点，返回默认数据
    if (!result) {
      // 使用第一个知识点的数据作为默认值
      const defaultKey = Object.keys(mockData)[0];
      result = {
        ...mockData[defaultKey],
        knowledge: `抱歉，暂时没有"${input}"的详细讲解。以下是相关知识点的内容：\n\n${mockData[defaultKey].knowledge}`
      };
    }

    return Response.json(result);

  } catch (error: any) {
    console.error("❌ ERROR:", error);
    return Response.json({
      knowledge: "出错了：" + error.message,
    });
  }
}