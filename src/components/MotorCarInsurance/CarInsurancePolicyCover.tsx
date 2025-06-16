import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@/components/PrograssBar";

interface InsuranceCompany {
  id: string;
  name: string;
  logo: string;
  rating: number;
  available: boolean;
  basePremium: number;
  fees: {
    phcf: number;
    trainingLevy: number;
    stampDuty: number;
    emergencyAssist: number;
    transactionFee: number;
  };
  coverage: {
    emergencyMedical: number;
    towingRecovery: number;
    repairAuthority: number;
    thirdPartyBodilyInjury: number;
    thirdPartyPropertyDamage: number;
    passengerLegalLiability: number;
    windscreenGlass: number;
    carEntertainment: number;
  };
  additionalBenefits?: {
    terrorismCover?: number;
    roadRescue?: number;
    lossOfUse?: {
      days10: number;
      days20: number;
      days30: number;
    };
    excessProtector?: number;
  };
}

interface AdditionalBenefit {
  id: string;
  name: string;
  description: string;
  cost: number;
  added: boolean;
}

const CarPolicy = () => {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] =
    useState<InsuranceCompany | null>(null);
  const [showFullBreakdown, setShowFullBreakdown] = useState(false);
  const [additionalBenefits, setAdditionalBenefits] = useState<
    AdditionalBenefit[]
  >([]);

  // Insurance companies data with your specified cover details
  const insuranceCompanies: InsuranceCompany[] = [
    {
      id: "jubilee",
      name: "Jubilee-Allianz",
      logo: "/logos/jubilee.png",
      rating: 4.5,
      available: true,
      basePremium: 175000,
      fees: {
        phcf: 438,
        trainingLevy: 350,
        stampDuty: 40,
        emergencyAssist: 450,
        transactionFee: 2030,
      },
      coverage: {
        emergencyMedical: 50000,
        towingRecovery: 50000,
        repairAuthority: 50000,
        thirdPartyBodilyInjury: 3000000,
        thirdPartyPropertyDamage: 5000000,
        passengerLegalLiability: 3000000,
        windscreenGlass: 50000,
        carEntertainment: 50000,
      },
      additionalBenefits: {
        terrorismCover: 6250,
        roadRescue: 5000,
        lossOfUse: {
          days10: 4500,
          days20: 9000,
          days30: 13500,
        },
        excessProtector: 6250,
      },
    },
    {
      id: "cici",
      name: "CIC Insurance",
      logo: "/logos/cici.png",
      rating: 4.2,
      available: true,
      basePremium: 180000,
      fees: {
        phcf: 450,
        trainingLevy: 350,
        stampDuty: 40,
        emergencyAssist: 500,
        transactionFee: 2000,
      },
      coverage: {
        emergencyMedical: 60000,
        towingRecovery: 60000,
        repairAuthority: 60000,
        thirdPartyBodilyInjury: 3500000,
        thirdPartyPropertyDamage: 6000000,
        passengerLegalLiability: 3500000,
        windscreenGlass: 60000,
        carEntertainment: 60000,
      },
      additionalBenefits: {
        terrorismCover: 6500,
        roadRescue: 5500,
        lossOfUse: {
          days10: 5000,
          days20: 10000,
          days30: 15000,
        },
        excessProtector: 6500,
      },
    },
    {
      id: "heritage",
      name: "Heritage Insurance",
      logo: "/logos/heritage.png",
      rating: 4.0,
      available: true,
      basePremium: 170000,
      fees: {
        phcf: 435,
        trainingLevy: 350,
        stampDuty: 40,
        emergencyAssist: 400,
        transactionFee: 2100,
      },
      coverage: {
        emergencyMedical: 55000,
        towingRecovery: 55000,
        repairAuthority: 55000,
        thirdPartyBodilyInjury: 3200000,
        thirdPartyPropertyDamage: 5500000,
        passengerLegalLiability: 3200000,
        windscreenGlass: 55000,
        carEntertainment: 55000,
      },
      additionalBenefits: {
        terrorismCover: 6000,
        roadRescue: 5200,
        lossOfUse: {
          days10: 4800,
          days20: 9500,
          days30: 14000,
        },
        excessProtector: 6000,
      },
    },
  ];

  // Initialize additional benefits when a company is selected
  const initializeAdditionalBenefits = (company: InsuranceCompany) => {
    return [
      {
        id: "terrorism",
        name: "Terrorism, Sabotage & Political Risks",
        description:
          "Cover for damages caused by terrorism or political violence",
        cost: company.additionalBenefits?.terrorismCover || 0,
        added: false,
      },
      {
        id: "windscreen",
        name: "Windscreen and Window Glass",
        description: "Free up to KES 50,000",
        cost: 0,
        added: false,
      },
      {
        id: "road_rescue",
        name: "Road Rescue",
        description: "24/7 emergency road assistance",
        cost: company.additionalBenefits?.roadRescue || 0,
        added: false,
      },
      {
        id: "loss_of_use_10",
        name: "Loss of Use (10 Days)",
        description: "Cover for alternative transport for 10 days",
        cost: company.additionalBenefits?.lossOfUse?.days10 || 0,
        added: false,
      },
      {
        id: "loss_of_use_20",
        name: "Loss of Use (20 Days)",
        description: "Cover for alternative transport for 20 days",
        cost: company.additionalBenefits?.lossOfUse?.days20 || 0,
        added: false,
      },
      {
        id: "loss_of_use_30",
        name: "Loss of Use (30 Days)",
        description: "Cover for alternative transport for 30 days",
        cost: company.additionalBenefits?.lossOfUse?.days30 || 0,
        added: false,
      },
      {
        id: "excess_protector",
        name: "Excess Protector",
        description: "Covers your excess in case of a claim",
        cost: company.additionalBenefits?.excessProtector || 0,
        added: false,
      },
    ];
  };

  const calculateTotalPremium = (company: InsuranceCompany): number => {
    if (!company) return 0;

    const baseTotal =
      company.basePremium +
      company.fees.phcf +
      company.fees.trainingLevy +
      company.fees.stampDuty +
      company.fees.emergencyAssist +
      company.fees.transactionFee;

    const additionalCosts = additionalBenefits
      .filter((benefit) => benefit.added)
      .reduce((sum, benefit) => sum + benefit.cost, 0);

    return baseTotal + additionalCosts;
  };

  const handleCompanySelect = (company: InsuranceCompany) => {
    if (company.available) {
      setSelectedCompany(company);
      setShowFullBreakdown(true);
      setAdditionalBenefits(initializeAdditionalBenefits(company));
    }
  };

  const toggleBenefit = (benefitId: string) => {
    setAdditionalBenefits((prevBenefits) =>
      prevBenefits.map((benefit) =>
        benefit.id === benefitId
          ? { ...benefit, added: !benefit.added }
          : benefit
      )
    );
  };

  const handleContinue = () => {
    if (selectedCompany) {
      localStorage.setItem(
        "selectedInsurance",
        JSON.stringify({
          company: selectedCompany,
          totalPremium: calculateTotalPremium(selectedCompany),
          additionalBenefits: additionalBenefits.filter((b) => b.added),
        })
      );
      navigate("/insurance/motor-car/payment");
    }
  };

  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <div className="hidden md:block w-3/8 ml-16">
        <ProgressBar currentStage={3} />
      </div>
      <div className="w-full md:w-5/8 container mx-auto px-4 py-8 bg-white rounded-xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Select Your Insurance Provider
        </h1>
        <p className="text-gray-600 mb-8">
          Compare quotes from our trusted insurance partners
        </p>

        {/* Insurance Company Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {insuranceCompanies.map((company) => (
            <div
              key={company.id}
              className={`border rounded-xl p-6 transition-all ${
                company.available
                  ? "cursor-pointer hover:border-gray-300 hover:shadow-md"
                  : "cursor-not-allowed opacity-70"
              } ${
                selectedCompany?.id === company.id
                  ? "border-green-600 bg-green-50 shadow-md"
                  : "border-gray-200"
              }`}
              onClick={() => handleCompanySelect(company)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                    {/* Company logo would go here */}
                    <span className="text-xs font-medium text-gray-500">
                      {company.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {company.name}
                    </h3>
                  </div>
                </div>
                {company.available ? (
                  <div className="text-right">
                    <p className="text-sm text-gray-500">From</p>
                    <p className="text-xl font-bold text-green-600">
                      {formatCurrency(company.basePremium)}
                    </p>
                  </div>
                ) : (
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Coming Soon
                    </span>
                  </div>
                )}
              </div>

              {!company.available && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    {company.name} cover is not currently available
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Policy Breakdown Section */}
        {selectedCompany && showFullBreakdown && (
          <div className="w-full bg-white rounded-xl shadow-md p-6 mb-8 transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCompany.name} Policy Details
              </h2>
              <button
                onClick={() => setShowFullBreakdown(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Premium Breakdown */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Premium Breakdown
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Base Premium</span>
                    <span className="font-medium">
                      {formatCurrency(selectedCompany.basePremium)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">PHCF</span>
                    <span className="font-medium">
                      {formatCurrency(selectedCompany.fees.phcf)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Training Levy</span>
                    <span className="font-medium">
                      {formatCurrency(selectedCompany.fees.trainingLevy)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Stamp Duty</span>
                    <span className="font-medium">
                      {formatCurrency(selectedCompany.fees.stampDuty)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Emergency Assist</span>
                    <span className="font-medium">
                      {formatCurrency(selectedCompany.fees.emergencyAssist)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Transaction Fee</span>
                    <span className="font-medium">
                      {formatCurrency(selectedCompany.fees.transactionFee)}
                    </span>
                  </div>

                  {/* Additional Benefits */}
                  {additionalBenefits
                    .filter((benefit) => benefit.added)
                    .map((benefit) => (
                      <div
                        key={benefit.id}
                        className="flex justify-between border-b pb-2"
                      >
                        <span className="text-gray-600">{benefit.name}</span>
                        <span className="font-medium">
                          {benefit.cost > 0
                            ? formatCurrency(benefit.cost)
                            : "Free"}
                        </span>
                      </div>
                    ))}

                  <div className="flex justify-between pt-4">
                    <span className="text-lg font-semibold">Total Premium</span>
                    <span className="text-lg font-bold text-green-600">
                      {formatCurrency(calculateTotalPremium(selectedCompany))}
                    </span>
                  </div>
                </div>
              </div>

              {/* Coverage Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Included Coverage
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">
                      Emergency Medical Expense
                    </span>
                    <span className="font-medium">
                      {formatCurrency(
                        selectedCompany.coverage.emergencyMedical
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Towing and Recovery</span>
                    <span className="font-medium">
                      {formatCurrency(selectedCompany.coverage.towingRecovery)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Repair Authority</span>
                    <span className="font-medium">
                      {formatCurrency(selectedCompany.coverage.repairAuthority)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">
                      Third Party Bodily Injury
                    </span>
                    <span className="font-medium">
                      {formatCurrency(
                        selectedCompany.coverage.thirdPartyBodilyInjury
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">
                      Third Party Property Damage
                    </span>
                    <span className="font-medium">
                      {formatCurrency(
                        selectedCompany.coverage.thirdPartyPropertyDamage
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">
                      Passenger Legal Liability
                    </span>
                    <span className="font-medium">
                      {formatCurrency(
                        selectedCompany.coverage.passengerLegalLiability
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">
                      Windscreen and Window Glass
                    </span>
                    <span className="font-medium">
                      {formatCurrency(selectedCompany.coverage.windscreenGlass)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Car Entertainment</span>
                    <span className="font-medium">
                      {formatCurrency(
                        selectedCompany.coverage.carEntertainment
                      )}
                    </span>
                  </div>
                </div>

                {/* Additional Benefits Section */}
                <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-4">
                  Optional Add-ons
                </h3>
                <div className="space-y-3">
                  {additionalBenefits.map((benefit) => (
                    <div
                      key={benefit.id}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <div>
                        <p className="text-gray-600">{benefit.name}</p>
                        {benefit.description && (
                          <p className="text-xs text-gray-400">
                            {benefit.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-4">
                          {benefit.cost > 0
                            ? formatCurrency(benefit.cost)
                            : "Free"}
                        </span>
                        <button
                          onClick={() => toggleBenefit(benefit.id)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            benefit.added
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                          }`}
                        >
                          {benefit.added ? "Added ✓" : "Add +"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors shadow-md hover:shadow-lg"
          >
            <svg
              className="w-4 h-4 mr-2 inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>

          {selectedCompany && (
            <div className="text-center mr-4">
              <p className="text-sm text-gray-500">Selected</p>
              <p className="font-medium">{selectedCompany.name}</p>
            </div>
          )}

          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedCompany}
            className={`flex items-center px-6 py-3 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors shadow-md hover:shadow-lg ${
              selectedCompany
                ? "bg-gradient-to-r from-green-600 to-green-800 text-white hover:from-green-700 hover:to-green-900 focus:ring-green-500"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continue
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default CarPolicy;
